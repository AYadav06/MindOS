import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { ContentModel } from "../models/user";
import { embeddingService } from "../services/embedding";
import { findSimilar } from "../utils/vectorSearch";

export const searchRouter = Router();

/**
 * Semantic search endpoint
 * GET /api/v1/search?q=query&limit=10&threshold=0.5
 */
searchRouter.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const threshold = parseFloat(req.query.threshold as string) || 0.3;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const userId = req.userId;

    // Generate embedding for the search query
    const queryEmbedding = await embeddingService.generateEmbedding(query);

    // Fetch all user's content with embeddings
    const contents = await ContentModel.find({
      userId,
      embedding: { $exists: true, $ne: null },
    }).select("+embedding"); // Include embedding field

    if (contents.length === 0) {
      return res.json({
        message: "No content with embeddings found. Create some content first.",
        results: [],
        count: 0,
      });
    }

    // Find similar content using vector similarity
    // Convert Mongoose documents to plain objects for type compatibility
    const contentsArray = contents.map(doc => {
      const obj = doc.toObject();
      return {
        ...obj,
        embedding: obj.embedding ?? null,
      };
    });
    
    const similarResults = findSimilar(queryEmbedding, contentsArray, threshold, limit);

    // Format results (exclude embeddings from response)
    const results = similarResults.map(({ item, similarity }) => {
      const { embedding, ...contentObj } = item;
      return {
        ...contentObj,
        similarity: Math.round(similarity * 100) / 100, // Round to 2 decimal places
      };
    });

    res.json({
      message: "Search completed successfully",
      query,
      results,
      count: results.length,
      threshold,
    });
  } catch (error) {
    console.error("Error in semantic search:", error);
    res.status(500).json({
      message: "Internal server error during search",
      error: error instanceof Error ? error.message : error,
    });
  }
});

/**
 * Generate embeddings for existing content (useful for migration)
 * POST /api/v1/search/generate-embeddings
 */
searchRouter.post("/generate-embeddings", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Find all content without embeddings
    const contents = await ContentModel.find({
      userId,
      $or: [
        { embedding: { $exists: false } },
        { embedding: null },
        { embedding: { $size: 0 } },
      ],
    });

    if (contents.length === 0) {
      return res.json({
        message: "All content already has embeddings",
        processed: 0,
      });
    }

    let processed = 0;
    let errors = 0;

    // Generate embeddings for each content item
    for (const content of contents) {
      try {
        const typeValue: string | undefined = content.type ? String(content.type) : undefined;
        const embedding = await embeddingService.generateContentEmbedding(
          String(content.title),
          content.tags.map(tag => ({ title: String(tag.title) })),
          typeValue
        );

        content.embedding = embedding;
        await content.save();
        processed++;
      } catch (error) {
        console.error(`Error generating embedding for content ${content._id}:`, error);
        errors++;
      }
    }

    res.json({
      message: "Embedding generation completed",
      processed,
      errors,
      total: contents.length,
    });
  } catch (error) {
    console.error("Error generating embeddings:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
});

