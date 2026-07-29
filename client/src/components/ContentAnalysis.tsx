// import React, { useState } from "react";
// import { Brain, X, Loader2, Sparkles, Lightbulb, Target, BookOpen } from "lucide-react";
// import api from "../utils/api";

// interface AnalysisResult {
//   summary: string;
//   keyPoints: string[];
//   insights: string;
//   relatedTopics: string[];
// }

// interface ContentAnalysisProps {
//   contentId?: string;
//   title: string;
//   tags: Array<{ title: string }> | string[];
//   type: string;
//   link?: string;
//   onClose?: () => void;
// }

// export const ContentAnalysis: React.FC<ContentAnalysisProps> = ({
//   contentId,
//   title,
//   tags,
//   type,
//   link,
//   onClose,
// }) => {
//   const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAnalyze = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Transform tags if they're strings
//       const tagsArray = Array.isArray(tags) && tags.length > 0
//         ? typeof tags[0] === 'string'
//           ? tags.map((tag, idx) => ({ tagId: idx.toString(), title: tag as string }))
//           : tags as Array<{ title: string }>
//         : [];

//       let response;
//       if (contentId) {
//         // Analyze by content ID
//         response = await api.post(`/api/v1/analyze/${contentId}`);
//       } else {
//         // Analyze by providing content data directly
//         response = await api.post("/api/v1/analyze", {
//           title,
//           tags: tagsArray,
//           type,
//           link,
//         });
//       }

//       setAnalysis(response.data.analysis);
//     } catch (err: any) {
//       console.error("Analysis failed:", err);
//       setError(
//         err.response?.data?.message || "Failed to analyze content. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#0F1629]/70 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
//             <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
//           </div>
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-300">AI Analysis</h3>
//         </div>
//         {onClose && (
//           <button
//             onClick={onClose}
//             className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-400 hover:text-white" />
//           </button>
//         )}
//       </div>

//       {!analysis && !isLoading && !error && (
//         <div className="text-center py-6 sm:py-8">
//           <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
//           <p className="text-gray-400 mb-4 text-sm sm:text-base">
//             Get AI-powered insights about this content
//           </p>
//           <button
//             onClick={handleAnalyze}
//             className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
//           >
//             <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
//             Analyze Content
//           </button>
//         </div>
//       )}

//       {isLoading && (
//         <div className="flex flex-col items-center justify-center py-8 sm:py-12">
//           <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 animate-spin mb-4" />
//           <p className="text-gray-400 text-sm sm:text-base">Analyzing content with AI...</p>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl p-4 mb-4">
//           <p className="text-red-400 text-sm sm:text-base">{error}</p>
//           <button
//             onClick={handleAnalyze}
//             className="mt-3 text-sm text-red-300 hover:text-red-200 underline"
//           >
//             Try again
//           </button>
//         </div>
//       )}

//       {analysis && (
//         <div className="space-y-4 sm:space-y-6">
//           {/* Summary */}
//           <div>
//             <div className="flex items-center gap-2 mb-2 sm:mb-3">
//               <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
//               <h4 className="text-base sm:text-lg font-semibold text-gray-300">Summary</h4>
//             </div>
//             <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-6 sm:pl-7">
//               {analysis.summary}
//             </p>
//           </div>

//           {/* Key Points */}
//           {analysis.keyPoints && analysis.keyPoints.length > 0 && (
//             <div>
//               <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                 <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
//                 <h4 className="text-base sm:text-lg font-semibold text-gray-300">Key Points</h4>
//               </div>
//               <ul className="space-y-2 pl-6 sm:pl-7">
//                 {analysis.keyPoints.map((point, idx) => (
//                   <li key={idx} className="text-sm sm:text-base text-gray-400 flex items-start gap-2">
//                     <span className="text-green-400 mt-1">•</span>
//                     <span>{point}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Insights */}
//           {analysis.insights && (
//             <div>
//               <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                 <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
//                 <h4 className="text-base sm:text-lg font-semibold text-gray-300">Insights</h4>
//               </div>
//               <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-6 sm:pl-7">
//                 {analysis.insights}
//               </p>
//             </div>
//           )}

//           {/* Related Topics */}
//           {analysis.relatedTopics && analysis.relatedTopics.length > 0 && (
//             <div>
//               <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                 <h4 className="text-base sm:text-lg font-semibold text-gray-300">Related Topics</h4>
//               </div>
//               <div className="flex flex-wrap gap-2 pl-6 sm:pl-7">
//                 {analysis.relatedTopics.map((topic, idx) => (
//                   <span
//                     key={idx}
//                     className="px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-300"
//                   >
//                     {topic}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Re-analyze button */}
//           <button
//             onClick={handleAnalyze}
//             className="w-full mt-4 px-4 py-2 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-gray-300 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
//           >
//             <Brain className="w-4 h-4" />
//             Analyze Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };



import React, { useState } from "react";
import {
  Brain,
  Loader2,
  Sparkles,
  Lightbulb,
  Target,
  BookOpen,
} from "lucide-react";
import api from "../utils/api";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  insights: string;
  relatedTopics: string[];
}

interface ContentAnalysisProps {
  contentId?: string;
  title: string;
  tags: Array<{ title: string }> | string[];
  type: string;
  link?: string;
  onClose?: () => void;
}

export const ContentAnalysis: React.FC<ContentAnalysisProps> = ({
  contentId,
  title,
  tags,
  type,
  link,
  onClose,
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const tagsArray =
        Array.isArray(tags) && tags.length > 0
          ? typeof tags[0] === "string"
            ? tags.map((tag, idx) => ({
                tagId: idx.toString(),
                title: tag as string,
              }))
            : (tags as Array<{ title: string }>)
          : [];

      let response;
      if (contentId) {
        response = await api.post(`/api/v1/analyze/${contentId}`);
      } else {
        response = await api.post("/api/v1/analyze", {
          title,
          tags: tagsArray,
          type,
          link,
        });
      }

      setAnalysis(response.data.analysis);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to analyze content. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0F1629]/70 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-300">
            AI Analysis
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Initial State */}
      {!analysis && !isLoading && !error && (
        <div className="text-center py-6 sm:py-8">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Get AI-powered insights about this content
          </p>
          <button
            onClick={handleAnalyze}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
          >
            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            Analyze Content
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-400 text-sm sm:text-base">
            Analyzing content with AI...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm sm:text-base">{error}</p>
          <button
            onClick={handleAnalyze}
            className="mt-3 text-sm text-red-300 hover:text-red-200 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Analysis Result */}
      {analysis && (
        <div className="space-y-4 sm:space-y-6">
          {/* Summary */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h4 className="text-base sm:text-lg font-semibold text-gray-300">
                Summary
              </h4>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-6 sm:pl-7">
              {analysis.summary}
            </p>
          </div>

          {/* Key Points */}
          {analysis.keyPoints?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-300">
                  Key Points
                </h4>
              </div>
              <ul className="space-y-2 pl-6 sm:pl-7">
                {analysis.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-sm sm:text-base text-gray-400 flex items-start gap-2"
                  >
                    <span className="text-green-400 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Insights */}
          {analysis.insights && (
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-300">
                  Insights
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-6 sm:pl-7">
                {analysis.insights}
              </p>
            </div>
          )}

          {/* Related Topics */}
          {analysis.relatedTopics?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-300">
                  Related Topics
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 pl-6 sm:pl-7">
                {analysis.relatedTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Re-analyze */}
          <button
            onClick={handleAnalyze}
            className="w-full mt-4 px-4 py-2 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-gray-300 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Brain className="w-4 h-4" />
            Analyze Again
          </button>
        </div>
      )}
    </div>
  );
};
