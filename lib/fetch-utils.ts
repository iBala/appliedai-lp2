/**
 * Utility functions for fetching data from the API
 */

/**
 * Get the absolute API URL
 * This ensures consistency across server and client components
 */
export function getApiUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // During server-side rendering, use the configured site URL
  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return `${baseUrl}/api/${cleanPath}`;
  }
  
  // In the browser, use relative URL (avoids CORS issues)
  return `/api/${cleanPath}`;
}

/**
 * Fetch data from the API with consistent error handling
 */
export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = getApiUrl(path);
  
  try {
    const response = await fetch(url, {
      ...options,
      // Ensure we don't cache API responses to avoid stale data
      cache: 'no-store',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    // Get raw text first to help with debugging if JSON parsing fails
    const text = await response.text();
    
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      console.error('Failed to parse API response as JSON:', e);
      console.error('Raw response:', text);
      throw new Error('Invalid JSON response from API');
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * Type for company data
 */
export interface Company {
  id: number;
  name: string;
  about: string;
  funding_details: string;
  location: string;
  home_page: string;
  careers_page: string;
  created_at: string;
  tags: string[];
}

/**
 * Type for job data
 */
export interface Job {
  id: number;
  role_name: string;
  description: string;
  company_id: number;
  location: string;
  role_type: string;
  status: 'open' | 'closed';
  application_link: string;
  created_at: string;
  updated_at: string;
  company?: {
    id: number;
    name: string;
  };
}

/**
 * Type for job filter options
 */
export interface JobFilters {
  locations: string[];
  roleTypes: string[];
  companies: {
    id: number;
    name: string;
  }[];
}

/**
 * Fetch all companies
 */
export async function fetchCompanies(): Promise<Company[]> {
  const data = await fetchApi<{ companies: Company[] }>('companies');
  return data.companies || [];
}

/**
 * Fetch a specific company with its jobs
 */
export async function fetchCompanyWithJobs(id: string | number): Promise<{ company: Company; jobs: Job[] }> {
  return fetchApi<{ company: Company; jobs: Job[] }>(`companies/${id}`);
}

/**
 * Fetch jobs with optional filters
 */
export async function fetchJobs(filters?: {
  locations?: string[];
  roleTypes?: string[];
  companyIds?: number[];
}): Promise<Job[]> {
  // Build the query string
  const params = new URLSearchParams();
  params.append('status', 'open');
  
  // Add filter parameters if they exist
  if (filters?.locations?.length) {
    filters.locations.forEach(location => {
      params.append('location', location);
    });
  }
  
  if (filters?.roleTypes?.length) {
    filters.roleTypes.forEach(roleType => {
      params.append('role_type', roleType);
    });
  }
  
  if (filters?.companyIds?.length) {
    filters.companyIds.forEach(companyId => {
      params.append('company_id', companyId.toString());
    });
  }
  
  // Fetch the data
  const data = await fetchApi<{ jobs: Job[] }>(`jobs?${params.toString()}`);
  return data.jobs || [];
}

/**
 * Fetch all unique filter options for jobs
 */
export async function fetchJobFilterOptions(): Promise<JobFilters> {
  // Fetch all jobs to extract filter options
  const jobs = await fetchJobs();
  
  // Extract unique locations
  const locationSet = new Set<string>();
  jobs.forEach(job => {
    if (job.location) locationSet.add(job.location);
  });
  
  // Extract unique role types
  const roleTypeSet = new Set<string>();
  jobs.forEach(job => {
    if (job.role_type) roleTypeSet.add(job.role_type);
  });
  
  // Extract unique companies
  const companiesMap = new Map<number, string>();
  jobs.forEach(job => {
    if (job.company) {
      companiesMap.set(job.company.id, job.company.name);
    }
  });
  
  // Convert to arrays
  const locations = Array.from(locationSet).sort();
  const roleTypes = Array.from(roleTypeSet).sort();
  const companies = Array.from(companiesMap.entries()).map(([id, name]) => ({ id, name }));
  
  return {
    locations,
    roleTypes,
    companies
  };
} 