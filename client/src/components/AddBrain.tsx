
import React, { useState } from 'react';
import { Plus, X, Brain } from 'lucide-react';
import axios from 'axios';

interface BrainEntry {
  title: string;
  link: string;
  type: string;
  tags: string[];
}

interface AddBrainProps {
  onAdd?: () => void;
}

export  function AddBrain({ onAdd }: AddBrainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BrainEntry>({
    title: '',
    link: '',
    type: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (field: keyof Omit<BrainEntry, 'tags'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.link.trim() && formData.type.trim()) {
      
    
         const response=await axios.post('http://localhost:3000/api/v1/content',{
          title:formData.title,
          link:formData.link,
          type:formData.type,
          tags:formData.tags,
         },{
           headers:{
             Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
        
         console.log(response);
         onAdd?.();

      setFormData({
        title: '',
        link: '',
        type: '',
        tags: []
      });
      setTagInput('');
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form when closing
    setFormData({
      title: '',
      link: '',
      type: '',
      tags: []
    });
    setTagInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 py-3 bg-light-card text-light-text rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ml-15 mt-4 "
      >
        <Brain className="w-5 h-5 text-light-accent" />
        Add Brain
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-light-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-light-primary" />
                <h2 className="text-xl font-semibold text-gray-800">Add New Brain</h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-light-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-light-text" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Enter title"
                  required
                />
              </div>

              {/* Link Input */}
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  id="link"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="https://example.com"
                  required
                />
              </div>

              {/* Type Input */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                >
                  <option value="">Select type</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Tweets">Tweets</option>
                  <option value="URL">URL</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>

              {/* Tags Input */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-300 "
                    placeholder="Enter tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-light-secondary transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Display Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-300 text-light-text rounded-full text-sm hover:bg-light-secondary"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 bg-gray-300 text-light-text rounded-lg hover:bg-light-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-light-primary text-white rounded-lg hover:bg-light-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add Brain 
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}