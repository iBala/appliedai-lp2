import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import CreateTagsButton from '@/components/debug/CreateTagsButton';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Debug Companies | AppliedAI Club',
  description: 'Debug page for companies data',
};

// Special debug version of getCompanies that keeps more of the response data intact
async function getCompaniesDebug() {
  console.log('DEBUG PAGE: Starting to fetch companies');
  try {
    // Use absolute URL to fetch from the API - use environment variable for production compatibility
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/companies`, {
      cache: 'no-store' // Disable caching to always get fresh data
    });
    
    console.log('DEBUG PAGE: Fetch completed with status:', response.status);
    
    // Get the raw response text first
    const rawText = await response.text();
    console.log('DEBUG PAGE: Raw response text length:', rawText.length);
    console.log('DEBUG PAGE: Raw response text preview:', rawText.slice(0, 100) + '...');
    
    // Try to parse as JSON
    try {
      const data = JSON.parse(rawText);
      console.log('DEBUG PAGE: Successfully parsed response as JSON');
      return {
        success: true,
        rawLength: rawText.length,
        rawPreview: rawText.slice(0, 100) + '...',
        data,
        companiesCount: data.companies?.length || 0,
        firstCompany: data.companies?.[0] ? JSON.stringify(data.companies[0]).slice(0, 200) + '...' : 'None'
      };
    } catch (parseError) {
      console.error('DEBUG PAGE: Failed to parse response as JSON:', parseError);
      return {
        success: false,
        error: 'JSON parse error',
        rawText,
        parseError: String(parseError)
      };
    }
  } catch (error) {
    console.error('DEBUG PAGE ERROR: Error loading companies:', error);
    return {
      success: false,
      error: String(error)
    };
  }
}

export default async function DebugCompaniesPage() {
  console.log('DEBUG PAGE: Rendering debug companies page');
  const result = await getCompaniesDebug();
  
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="relative flex w-full flex-col overflow-hidden bg-white text-gray-900">
          {/* Header integrated into hero */}
          <Header theme="light" />
          
          {/* Content Container */}
          <div className="container relative z-10 mx-auto flex w-full flex-col px-8 py-12 md:py-10">
            <div className="max-w-5xl mx-auto w-full">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies Debug Page</h1>
                <Link href="/companies" className="text-blue-600 hover:underline">
                  Back to Companies Page
                </Link>
              </header>
            </div>
          </div>
        </div>
      </div>
      
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">API Response Debug Info</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded">
                <span className="font-medium block mb-1">Success:</span>
                <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                  {result.success ? 'Yes' : 'No'}
                </span>
              </div>
              
              {result.companiesCount !== undefined && (
                <div className="bg-gray-100 p-3 rounded">
                  <span className="font-medium block mb-1">Companies Count:</span>
                  <span className={result.companiesCount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {result.companiesCount}
                  </span>
                </div>
              )}
              
              {result.rawLength && (
                <div className="bg-gray-100 p-3 rounded">
                  <span className="font-medium block mb-1">Raw Response Length:</span>
                  {result.rawLength} characters
                </div>
              )}
              
              {result.error && (
                <div className="bg-red-100 p-3 rounded col-span-2">
                  <span className="font-medium block mb-1">Error:</span>
                  {result.error}
                </div>
              )}
              
              {result.parseError && (
                <div className="bg-red-100 p-3 rounded col-span-2">
                  <span className="font-medium block mb-1">Parse Error:</span>
                  {result.parseError}
                </div>
              )}
            </div>
            
            {result.rawPreview && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Raw Response Preview:</h3>
                <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto text-sm">
                  {result.rawPreview}
                </pre>
              </div>
            )}
            
            {result.firstCompany && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">First Company:</h3>
                <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto text-sm">
                  {result.firstCompany}
                </pre>
              </div>
            )}
            
            {result.data && (
              <div>
                <h3 className="text-lg font-medium mb-2">Parsed Data:</h3>
                <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto text-sm">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Debugging Tools</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">API Links:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a 
                      href="/api/companies" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Direct API Response (/api/companies)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/echo-companies" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Echo API Debug (/api/debug/echo-companies)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/env-check" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Environment Variables Check (/api/debug/env-check)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/schema-check" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Database Schema Check (/api/debug/schema-check)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/tags-check" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Tags and Mappings Check (/api/debug/tags-check)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/tables?table=ai_companies" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Check Database Table (/api/debug/tables?table=ai_companies)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/api/debug/sql-insert-company" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Insert Test Company (/api/debug/sql-insert-company)
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Actions:</h3>
                <div className="space-y-2">
                  <CreateTagsButton />
                  <p className="text-sm text-gray-600">
                    Creates sample tags and maps them to companies if tables exist but are empty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 