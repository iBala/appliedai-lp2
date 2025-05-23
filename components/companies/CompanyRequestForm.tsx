"use client"

import { useState, useEffect, useRef } from 'react';
import { X, Upload, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

interface Tag {
  id: number;
  tag: string;
}

interface CompanyRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyRequestForm({ isOpen, onClose }: CompanyRequestFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    homePage: '',
    about: '',
    logo: '',
    tags: [] as string[],
    careersSite: '',
    fundingDetails: '',
    hqLocation: '',
    submitterName: '',
    submitterEmail: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  
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
      const response = await fetch('/api/companies/tags');
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
    
    // Special handling for funding details character limit
    if (name === 'fundingDetails' && value.length > 10) {
      return;
    }
    
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

  // Handle logo file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Please upload a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Logo file must be smaller than 5MB');
        return;
      }
      
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
        // For now, store the data URL in form data
        // In production, you'd upload to a file storage service
        setFormData(prev => ({ ...prev, logo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
      
      setSubmitError('');
    }
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      'name', 'homePage', 'about', 'fundingDetails', 'hqLocation', 'submitterName', 'submitterEmail'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    }
    
    if (formData.tags.length === 0) {
      return 'Please select at least one tag';
    }
    
    // Validate URLs
    try {
      new URL(formData.homePage);
    } catch {
      return 'Please enter a valid home page URL';
    }
    
    if (formData.careersSite) {
      try {
        new URL(formData.careersSite);
      } catch {
        return 'Please enter a valid careers site URL';
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
      console.log('Submitting company request form with data:', formData);
      
      const response = await fetch('/api/companies/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitMessage(data.message);
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            homePage: '',
            about: '',
            logo: '',
            tags: [],
            careersSite: '',
            fundingDetails: '',
            hqLocation: '',
            submitterName: '',
            submitterEmail: ''
          });
          setLogoFile(null);
          setLogoPreview('');
          onClose();
        }, 2000);
      } else {
        setSubmitError(data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Request to Add Company</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Criteria Banner */}
        <div className="bg-blue-50 border-l-4 border-[#0A40C2] p-4 m-6 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-[#0A40C2]" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Criteria:</strong> The company should be AI-first and have raised over $1M USD in funding or bootstrapped to over $1M USD in revenue.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="Enter company name"
                disabled={isSubmitting}
              />
            </div>

            {/* Home Page */}
            <div>
              <label htmlFor="homePage" className="block text-sm font-medium text-gray-700 mb-1">
                Home Page URL *
              </label>
              <input
                type="url"
                id="homePage"
                name="homePage"
                value={formData.homePage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="https://example.com"
                disabled={isSubmitting}
              />
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                About the Company *
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="Brief description of the company..."
                disabled={isSubmitting}
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-gray-900">
                  <Upload size={16} className="mr-2" />
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
                {logoPreview && (
                  <div className="flex items-center space-x-2">
                    <img src={logoPreview} alt="Logo preview" className="w-10 h-10 object-contain rounded" />
                    <span className="text-sm text-gray-600">{logoFile?.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
            </div>

            {/* Tags - Multiselect Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags * {tagsLoading && <span className="text-gray-400">(Loading...)</span>}
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isSubmitting || tagsLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900 text-left flex items-center justify-between bg-white"
                >
                  <span className={formData.tags.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                    {formData.tags.length === 0 
                      ? 'Select tags...' 
                      : `${formData.tags.length} tag${formData.tags.length === 1 ? '' : 's'} selected`
                    }
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <label 
                        key={tag.id} 
                        className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.tags.includes(tag.tag)}
                          onChange={() => handleTagToggle(tag.tag)}
                          className="rounded border-gray-300 text-[#0A40C2] focus:ring-[#0A40C2] mr-3"
                          disabled={isSubmitting || tagsLoading}
                        />
                        <span className="text-sm text-gray-900">{tag.tag}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selected tags display */}
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#0A40C2] border border-[#0A40C2]/20"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className="ml-1 hover:text-[#0A40C2]/70"
                        disabled={isSubmitting}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">Select all applicable tags</p>
            </div>

            {/* Careers Site */}
            <div>
              <label htmlFor="careersSite" className="block text-sm font-medium text-gray-700 mb-1">
                Careers Site URL
              </label>
              <input
                type="url"
                id="careersSite"
                name="careersSite"
                value={formData.careersSite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="https://careers.example.com"
                disabled={isSubmitting}
              />
            </div>

            {/* Funding Details */}
            <div>
              <label htmlFor="fundingDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Funding Details * <span className="text-gray-500">({formData.fundingDetails.length}/10 chars)</span>
              </label>
              <input
                type="text"
                id="fundingDetails"
                name="fundingDetails"
                value={formData.fundingDetails}
                onChange={handleInputChange}
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="e.g., $5M Series A, $10M revenue"
                disabled={isSubmitting}
              />
            </div>

            {/* HQ Location */}
            <div>
              <label htmlFor="hqLocation" className="block text-sm font-medium text-gray-700 mb-1">
                HQ Location *
              </label>
              <input
                type="text"
                id="hqLocation"
                name="hqLocation"
                value={formData.hqLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="San Francisco, CA"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submitter Information */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
            
            {/* Submitter Name */}
            <div>
              <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="submitterName"
                name="submitterName"
                value={formData.submitterName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>

            {/* Submitter Email */}
            <div>
              <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email *
              </label>
              <input
                type="email"
                id="submitterEmail"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A40C2] focus:border-transparent text-gray-900"
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Messages */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {submitError}
            </div>
          )}

          {submitMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
              <CheckCircle size={16} className="mr-2 flex-shrink-0" />
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-md transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#0A40C2] hover:bg-[#0A40C2]/90'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 