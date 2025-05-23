import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

// Types
interface Company {
  id: number
  name: string
  about: string
  funding_details: string
  location: string
  home_page: string
  careers_page: string
}

interface Job {
  id: number
  role_name: string
  description: string
  location: string
  role_type: string
  created_at: string
}

interface CompanyWithJobs {
  company: Company
  jobs: Job[]
}

// Define params type for Next.js 15+
type Params = Promise<{ id: string }>

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const company = await getCompany(resolvedParams.id);
    
    return {
      title: `${company.company.name} | AppliedAI Club`,
      description: company.company.about || `Details about ${company.company.name} and open positions`,
    };
  } catch {
    return {
      title: 'Company | AppliedAI Club',
      description: 'Company details',
    };
  }
}

// Server component to fetch company details
async function getCompany(id: string): Promise<CompanyWithJobs> {
  try {
    // Use absolute URL to fetch from the API
    const response = await fetch(new URL(`/api/companies/${id}`, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch company: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading company:', error);
    notFound();
  }
}

export default async function CompanyDetailPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const { company, jobs } = await getCompany(resolvedParams.id);
  
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="relative flex w-full flex-col overflow-hidden bg-white text-gray-900">
          {/* Header integrated into hero */}
          <Header theme="light" />
          
          {/* Content Container */}
          <div className="container relative z-10 mx-auto flex w-full flex-col px-8 py-12 md:py-10">
            <div className="max-w-5xl mx-auto w-full">
              {/* Breadcrumb */}
              <nav className="flex mb-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link 
                      href="/companies" 
                      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-gray-400"
                      >
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                      <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                        {company.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Company Header */}
          <div className="border-b pb-8 mb-8">
            <h1 className="text-3xl font-bold text-black mb-4">{company.name}</h1>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {company.location && (
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {company.location}
                </span>
              )}
              
              {company.funding_details && (
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {company.funding_details}
                </span>
              )}
            </div>
            
            <p className="text-gray-700 text-lg mt-4">{company.about}</p>
            
            {/* External links */}
            <div className="flex mt-6 gap-4">
              {company.home_page && (
                <a 
                  href={company.home_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                  </svg>
                  Website
                </a>
              )}
              
              {company.careers_page && (
                <a 
                  href={company.careers_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  Careers
                </a>
              )}
            </div>
          </div>
          
          {/* Jobs Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Open Positions</h2>
            
            {jobs.length === 0 ? (
              <div className="text-gray-500 py-4">
                No open positions at the moment. Check back later or visit their 
                {company.careers_page && (
                  <a 
                    href={company.careers_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    careers page
                  </a>
                )}.
              </div>
            ) : (
              <div className="space-y-5">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-xl font-medium text-black mb-2">{job.role_name}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.location && (
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
                          {job.location}
                        </span>
                      )}
                      
                      {job.role_type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {job.role_type}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    {company.careers_page && (
                      <a 
                        href={company.careers_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Apply
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          className="ml-1"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 