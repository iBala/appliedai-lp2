'use client';

// import { useState } from 'react';
import { JobFilters } from '@/lib/fetch-utils';

interface JobFiltersProps {
  filterOptions: JobFilters;
  selectedFilters: {
    locations: string[];
    roleTypes: string[];
    companyIds: number[];
  };
  onFilterChange: (newFilters: {
    locations: string[];
    roleTypes: string[];
    companyIds: number[];
  }) => void;
}

export default function JobFiltersComponent({
  filterOptions,
  selectedFilters,
  onFilterChange,
}: JobFiltersProps) {
  // Handle location filter change
  const handleLocationChange = (location: string) => {
    const newLocations = selectedFilters.locations.includes(location)
      ? selectedFilters.locations.filter(l => l !== location)
      : [...selectedFilters.locations, location];
    
    onFilterChange({
      ...selectedFilters,
      locations: newLocations,
    });
  };

  // Handle role type filter change
  const handleRoleTypeChange = (roleType: string) => {
    const newRoleTypes = selectedFilters.roleTypes.includes(roleType)
      ? selectedFilters.roleTypes.filter(r => r !== roleType)
      : [...selectedFilters.roleTypes, roleType];
    
    onFilterChange({
      ...selectedFilters,
      roleTypes: newRoleTypes,
    });
  };

  // Handle company filter change
  const handleCompanyChange = (companyId: number) => {
    const newCompanyIds = selectedFilters.companyIds.includes(companyId)
      ? selectedFilters.companyIds.filter(id => id !== companyId)
      : [...selectedFilters.companyIds, companyId];
    
    onFilterChange({
      ...selectedFilters,
      companyIds: newCompanyIds,
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      locations: [],
      roleTypes: [],
      companyIds: [],
    });
  };

  // Check if any filters are applied
  const hasActiveFilters = 
    selectedFilters.locations.length > 0 || 
    selectedFilters.roleTypes.length > 0 || 
    selectedFilters.companyIds.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Location</h4>
        <div className="space-y-2">
          {filterOptions.locations.map(location => (
            <div key={location} className="flex items-center">
              <input
                id={`location-${location}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedFilters.locations.includes(location)}
                onChange={() => handleLocationChange(location)}
              />
              <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-600">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Role Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Role Type</h4>
        <div className="space-y-2">
          {filterOptions.roleTypes.map(roleType => (
            <div key={roleType} className="flex items-center">
              <input
                id={`role-${roleType}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedFilters.roleTypes.includes(roleType)}
                onChange={() => handleRoleTypeChange(roleType)}
              />
              <label htmlFor={`role-${roleType}`} className="ml-2 text-sm text-gray-600">
                {roleType}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Company Filter */}
      <div className="mb-2">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Company</h4>
        <div className="space-y-2">
          {filterOptions.companies.map(company => (
            <div key={company.id} className="flex items-center">
              <input
                id={`company-${company.id}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedFilters.companyIds.includes(company.id)}
                onChange={() => handleCompanyChange(company.id)}
              />
              <label htmlFor={`company-${company.id}`} className="ml-2 text-sm text-gray-600">
                {company.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 