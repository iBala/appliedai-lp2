'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Company type definition
interface Company {
  id: number;
  name: string;
  about: string;
  home_page: string;
  logo?: string;
  like_count?: number;
  tags?: string[];
}

export default function DataStatus() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkApi() {
      try {
        // Try to fetch from the API to see if it works client-side
        const response = await fetch('/api/companies');
        
        if (!response.ok) {
          setStatus('error');
          setError(`API responded with status: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        
        if (!data.companies || !Array.isArray(data.companies)) {
          setStatus('error');
          setError(`API response missing companies array: ${JSON.stringify(data)}`);
          return;
        }
        
        setCompanies(data.companies);
        setStatus(data.companies.length > 0 ? 'success' : 'error');
      } catch (err) {
        setStatus('error');
        setError(String(err));
      }
    }
    
    checkApi();
  }, []);
  
  if (status === 'loading') {
    return <div className="text-blue-600 text-sm">Checking API status...</div>;
  }
  
  if (status === 'error' || companies.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
        <h3 className="text-red-800 font-medium mb-2">Data Loading Issue Detected!</h3>
        <p className="text-red-700 mb-3">
          The companies data is {companies.length === 0 ? 'empty' : 'not loading properly'}.
        </p>
        {error && (
          <div className="bg-red-100 p-3 rounded text-sm mb-3">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="text-sm">
          <strong>Try these steps:</strong>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Check that your Supabase environment variables are set correctly</li>
            <li>Verify the API is returning data by viewing <a href="/api/companies" target="_blank" className="underline">the raw API response</a></li>
            <li>Try the <Link href="/companies/debug" className="underline">debug page</Link> for more information</li>
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-green-600 text-sm">
      Successfully loaded {companies.length} companies from the API!
    </div>
  );
} 