"use client"

import { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, CheckCircle, ChevronDown, GitFork } from 'lucide-react';

interface Tag {
  id: number;
  tag: string;
}

interface RepoRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RepoRequestForm({ isOpen, onClose }: RepoRequestFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    githubUrl: '',
    description: '',
    homepageUrl: '',
    tags: [] as string[],
    language: '',
    license: '',
    submitterName: '',
    submitterEmail: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch available tags on component mount
  useEffect(() => {
    if (isOpen) {
      fetchTags();
    }
  }, [isOpen]);

  const fetchTags = async () => {
    try {
      setTagsLoading(true);
      const response = await fetch('/api/companies/tags'); // Reuse existing tags API
      const data = await response.json();
      
      if (data.success) {
        setAvailableTags(data.tags);
      } else {
        console.error('Failed to fetch tags:', data.error);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setTagsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      'name', 'githubUrl', 'description', 'submitterName', 'submitterEmail'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    }
    
    if (formData.tags.length === 0) {
      return 'Please select at least one tag';
    }
    
    // Validate GitHub URL
    try {
      const url = new URL(formData.githubUrl);
      if (!url.hostname.includes('github.com')) {
        return 'Please enter a valid GitHub repository URL';
      }
    } catch {
      return 'Please enter a valid GitHub repository URL';
    }
    
    // Validate homepage URL if provided
    if (formData.homepageUrl) {
      try {
        new URL(formData.homepageUrl);
      } catch {
        return 'Please enter a valid homepage URL';
      }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.submitterEmail)) {
      return 'Please enter a valid email address';
    }
    
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');
    
    try {
      console.log('Submitting repository request form with data:', formData);
      
      const response = await fetch('/api/repos/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage(result.message || 'Repository request submitted successfully!');
        // Reset form
        setFormData({
          name: '',
          githubUrl: '',
          description: '',
          homepageUrl: '',
          tags: [],
          language: '',
          license: '',
          submitterName: '',
          submitterEmail: ''
        });
        // Close form after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setSubmitError(result.error || 'Failed to submit repository request');
      }
    } catch (error) {
      console.error('Error submitting repository request:', error);
      setSubmitError('Failed to submit repository request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close with cleanup
  const handleClose = () => {
    setSubmitMessage('');
    setSubmitError('');
    setIsSubmitting(false);
    onClose();
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GitFork className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Repository</h2>
              <p className="text-sm text-gray-600">Suggest an AI open source repository</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Repository Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Repository Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="e.g., transformers, langchain, pytorch"
              required
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL *
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="https://github.com/username/repository"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Brief description of what this repository does and why it's useful for AI projects..."
              required
            />
          </div>

          {/* Homepage URL (Optional) */}
          <div>
            <label htmlFor="homepageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Homepage URL (Optional)
            </label>
            <input
              type="url"
              id="homepageUrl"
              name="homepageUrl"
              value={formData.homepageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="https://example.com"
            />
          </div>

          {/* Language and License Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Language (Optional)
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="e.g., Python, JavaScript, TypeScript"
              />
            </div>
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                License (Optional)
              </label>
              <input
                type="text"
                id="license"
                name="license"
                value={formData.license}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="e.g., MIT, Apache-2.0, GPL-3.0"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags * (Select all that apply)
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between text-gray-900 bg-white"
              >
                <span className="text-gray-700">
                  {formData.tags.length === 0 
                    ? 'Select tags...' 
                    : `${formData.tags.length} tag${formData.tags.length === 1 ? '' : 's'} selected`
                  }
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {tagsLoading ? (
                    <div className="p-3 text-center text-gray-500">Loading tags...</div>
                  ) : (
                    <div className="p-2">
                      {availableTags.map((tag) => (
                        <label
                          key={tag.id}
                          className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.tags.includes(tag.tag)}
                            onChange={() => handleTagToggle(tag.tag)}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{tag.tag}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 h-3 w-3 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submitter Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="submitterName"
                  name="submitterName"
                  value={formData.submitterName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="submitterEmail"
                  name="submitterEmail"
                  value={formData.submitterEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700">{submitError}</span>
            </div>
          )}

          {/* Success Message */}
          {submitMessage && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700">{submitMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Repository'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 