import React, { useState } from "react";
import { X, Brain, Plus, Youtube, Twitter, ExternalLink, StickyNote, Tag } from "lucide-react";
import api from "../utils/api";

interface BrainEntry {
  title: string;
  link: string;
  type: string;
  tags: string[];
}

interface AddBrainProps {
  onAdd?: () => void;
}

export default function AddBrain({ onAdd }: AddBrainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BrainEntry>({
    title: "",
    link: "",
    type: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  const typeOptions = [
    { value: "YouTube", label: "YouTube", icon: Youtube, color: "text-red-400" },
    { value: "Tweets", label: "Tweets", icon: Twitter, color: "text-blue-400" },
    { value: "Link", label: "URL", icon: ExternalLink, color: "text-green-400" },
    { value: "Notes", label: "Notes", icon: StickyNote, color: "text-yellow-400" },
  ];

  const handleInputChange = (field: keyof Omit<BrainEntry, "tags">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async () => {
    if (formData.title && formData.link && formData.type) {
      setIsLoading(true);
      try {
        // Transform tags to the expected format with tagId and title
        const transformedTags = formData.tags.map((tag, index) => ({ 
          tagId: (index + 1).toString(), // Simple incremental ID, you might want to generate unique IDs
          title: tag 
        }));

        await api.post("/api/v1/content", {
          contentId: Date.now().toString(), 
          title: formData.title,
          link: formData.link,
          type: formData.type,
          tags: transformedTags,
          createdAt: new Date().toISOString(),
        });

        if (onAdd) onAdd();
        setFormData({ title: "", link: "", type: "", tags: [] });
        setTagInput("");
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error adding brain:", err);
        // You might want to show an error message to the user here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", link: "", type: "", tags: [] });
    setTagInput("");
  };

  const selectedType = typeOptions.find(option => option.value === formData.type);

  return (
    <div>
    
      <button
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center gap-3 px-4 py-3 bg-[#0F1629]/70  text-gray-300 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-white/10 border border-white/10"
      >
        <Brain className="w-5 h-5 text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold">Add Brain</span>
      </button>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-tl from-slate-800 via-blue-950 to-slate-700 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto backdrop-blur-2xl text-gray-300 border border-white/10">
            
           
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl border border-white/20">
                  <Brain className="w-6 h-6 text-light-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-300">Add New Brain</h2>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20"
              >
                <X className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              
              {/* Title Field - Your styling with enhancements */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Title
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter a descriptive title..."
                  />
                </div>
              </div>

              {/* Link Field - Your styling with enhancements */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Link
                </label>
                <div className="relative group">
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/15"
                    placeholder="https://example.com..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/15 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-800 text-gray-400">
                      Select type
                    </option>
                    <option value="YouTube" className="bg-slate-800 text-white">YouTube</option>
                    <option value="Tweets" className="bg-slate-800 text-white">Tweets</option>
                    <option value="Link" className="bg-slate-800 text-white">URL</option>
                    <option value="Notes" className="bg-slate-800 text-white">Notes</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {selectedType ? (
                      <selectedType.icon className={`w-5 h-5 ${selectedType.color}`} />
                    ) : (
                      <div className="w-5 h-5 border-2 border-white/30 border-dashed rounded"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags Field - Enhanced with better styling */}
              <div>
                <label className="text-sm font-medium mb-2 text-gray-200 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter tag & press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                
                {/* Tag Pills - Enhanced styling */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm hover:bg-white/20 transition-all duration-300"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-400 transition-colors p-0.5 hover:bg-red-500/20 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Buttons - Your exact styling with enhancements */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.title || !formData.link || !formData.type}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Add Brain
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}