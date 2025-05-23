'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import JobHeroSection from '@/components/jobs/JobHeroSection';
import JobIcon from '@/components/jobs/JobIcon';
import JobFiltersComponent from '@/components/jobs/JobFilters';
import JobCard from '@/components/jobs/JobCard';
import { fetchJobs, fetchJobFilterOptions, type Job, type JobFilters } from '@/lib/fetch-utils';

// Define the filter type
interface JobFilterState {
  locations: string[];
  roleTypes: string[];
  companyIds: number[];
}

export default function JobsPage() {
  // State for jobs and filters
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterOptions, setFilterOptions] = useState<JobFilters>({
    locations: [],
    roleTypes: [],
    companies: []
  });
  const [selectedFilters, setSelectedFilters] = useState<JobFilterState>({
    locations: [],
    roleTypes: [],
    companyIds: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load filter options on page load
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchJobFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Error loading filter options:', err);
        setError('Failed to load filter options. Please try again later.');
      }
    };

    loadFilterOptions();
  }, []);

  // Load jobs with filters
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const jobsData = await fetchJobs({
          locations: selectedFilters.locations,
          roleTypes: selectedFilters.roleTypes,
          companyIds: selectedFilters.companyIds
        });
        setJobs(jobsData);
        setError(null);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [selectedFilters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: JobFilterState) => {
    setSelectedFilters(newFilters);
  };

  return (
    <main className="min-h-screen">
      <JobHeroSection
        tag="Jobs"
        tagIcon={<JobIcon />}
        title="AI Jobs"
        description="Find the latest jobs in the AI industry"
      />
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <JobFiltersComponent
                filterOptions={filterOptions}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            {/* Jobs List */}
            <div className="md:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                  <p>{error}</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No jobs found matching your filters.
                  </p>
                  <button
                    onClick={() => setSelectedFilters({ locations: [], roleTypes: [], companyIds: [] })}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">
                      {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                    </h2>
                  </div>
                  
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 