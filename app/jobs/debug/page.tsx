import Link from 'next/link';
import { Metadata } from 'next';
import { fetchJobs, type Job } from '@/lib/fetch-utils';

export const metadata: Metadata = {
  title: 'Jobs Debug | AppliedAI Club',
  description: 'Debug page for jobs',
};

export default async function JobsDebugPage() {
  // Fetch all jobs
  let jobs: Job[] = [];
  let error: string | null = null;
  
  try {
    jobs = await fetchJobs();
    console.log(`DEBUG: Fetched ${jobs.length} jobs`);
  } catch (err: unknown) {
    console.error('DEBUG ERROR: Failed to fetch jobs:', err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/jobs"
          className="text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">Jobs Debug Page</h1>
        <p className="text-gray-600">
          This page shows raw job data from the API for debugging purposes.
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-8">
          <h2 className="text-red-800 font-medium mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      ) : null}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
        <ul className="space-y-2">
          <li>
            <a 
              href="/api/jobs" 
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View all jobs (JSON)
            </a>
          </li>
          <li>
            <a 
              href="/api/jobs?location=Remote" 
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Filter by location: Remote (JSON)
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Jobs Data ({jobs.length})</h2>
        
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Role Type</th>
                  <th className="px-4 py-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{job.id}</td>
                    <td className="px-4 py-2 border">{job.role_name}</td>
                    <td className="px-4 py-2 border">{job.company?.name || job.company_id}</td>
                    <td className="px-4 py-2 border">{job.location || 'N/A'}</td>
                    <td className="px-4 py-2 border">{job.role_type || 'N/A'}</td>
                    <td className="px-4 py-2 border">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 