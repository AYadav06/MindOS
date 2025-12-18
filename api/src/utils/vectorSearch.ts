/**
 * Vector similarity utilities for semantic search
 */

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    const a = vecA[i] ?? 0;
    const b = vecB[i] ?? 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * Find most similar items using cosine similarity
 */
export function findSimilar<T extends { embedding?: number[] | null }>(
  queryEmbedding: number[],
  items: T[],
  threshold: number = 0.0,
  limit: number = 10
): Array<{ item: T; similarity: number }> {
  const results: Array<{ item: T; similarity: number }> = [];

  for (const item of items) {
    if (!item.embedding || item.embedding.length === 0) {
      continue;
    }

    const similarity = cosineSimilarity(queryEmbedding, item.embedding);
    
    if (similarity >= threshold) {
      results.push({ item, similarity });
    }
  }

  // Sort by similarity (descending)
  results.sort((a, b) => b.similarity - a.similarity);

  return results.slice(0, limit);
}

