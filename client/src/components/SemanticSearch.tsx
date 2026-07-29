import React, { useState, useEffect } from "react";
import { NoteCard, type NoteCardProps } from "./NoteCard";
import api from "../utils/api";
import { Search, X, Loader2 } from "lucide-react";

interface SearchResult extends NoteCardProps {
  similarity?: number;
  contentId?: string;
}

export const SemanticSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const res = await api.get("/api/v1/search", {
        params: {
          q: searchQuery,
          limit: 20,
          threshold: 0.3,
        },
      });

      const mapped = res.data.results.map((c: any) => ({
        title: c.title,
        link: c.link,
        type: c.type,
        tags: c.tags.map((t: any) => t.title),
        similarity: c.similarity,
        contentId: c.contentId,
      }));

      setResults(mapped);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(
        err.response?.data?.message || "Failed to perform search. Please try again."
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  // Debounced search on query change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="w-full mb-4 sm:mb-6">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative mb-3 sm:mb-4">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-[#0F1629]/70 border border-white/10 rounded-lg sm:rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors p-1"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Searching...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !isLoading && (
        <div>
          {results.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-200">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </h2>
              </div>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((result, idx) => (
                  <div key={result.contentId || `${result.title}-${idx}`} className="relative">
                    <NoteCard
                      title={result.title}
                      link={result.link}
                      type={result.type}
                      tags={result.tags}
                    />
                    {result.similarity !== undefined && (
                      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1">
                        <span className="text-[10px] sm:text-xs font-medium text-blue-300">
                          {Math.round(result.similarity * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">
                No results found. Try a different search query.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

