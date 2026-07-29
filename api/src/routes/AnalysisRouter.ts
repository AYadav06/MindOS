import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { ContentModel } from "../models/user";
import { analysisService } from "../services/analysis";

export const analysisRouter = Router();

/**
 * Analyze content endpoint
 * POST /api/v1/analyze/:contentId
 */
analysisRouter.post("/:contentId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { contentId } = req.params;
    const userId = req.userId;

    if (!analysisService.isAvailable()) {
      return res.status(503).json({
        message: "Analysis service is not available. Please configure GEMINI_API_KEY.",
      });
    }

    // Find the content
    const content = await ContentModel.findOne({
      contentId,
      userId,
    });

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    // Analyze the content
    const analysis = await analysisService.analyzeContent(
      content.title,
      content.tags,
      content.type,
      content.link || undefined
    );

    res.json({
      message: "Analysis completed successfully",
      contentId,
      analysis,
    });
  } catch (error) {
    console.error("Error analyzing content:", error);
    res.status(500).json({
      message: "Internal server error during analysis",
      error: error instanceof Error ? error.message : error,
    });
  }
});

/**
 * Analyze content by providing content data directly
 * POST /api/v1/analyze
 */
analysisRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, tags, type, link } = req.body;

    if (!title || !type) {
      return res.status(400).json({
        message: "Title and type are required",
      });
    }

    if (!analysisService.isAvailable()) {
      return res.status(503).json({
        message: "Analysis service is not available. Please configure GEMINI_API_KEY.",
      });
    }

    // Analyze the content
    const analysis = await analysisService.analyzeContent(
      title,
      tags || [],
      type,
      link
    );

    res.json({
      message: "Analysis completed successfully",
      analysis,
    });
  } catch (error) {
    console.error("Error analyzing content:", error);
    res.status(500).json({
      message: "Internal server error during analysis",
      error: error instanceof Error ? error.message : error,
    });
  }
});

