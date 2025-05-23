"use client"
import { useState } from 'react'
import { Plus } from 'lucide-react'
import CompanyGrid from './CompanyGrid'
import CompanyRequestForm from './CompanyRequestForm'

// Company type definition (should match the one in CompanyGrid)
interface Company {
  id: number;
  name: string;
  about: string;
  home_page: string;
  logo?: string;
  like_count?: number;
  tags?: string[];
}

export default function CompaniesClientSection({ companies }: { companies: Company[] }) {
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <>
      {/* Header with Request Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Companies Directory</h2>
          <p className="text-gray-600">
            Discover promising AI-first companies that have raised over $1M in funding or revenue
          </p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center px-4 py-2 border border-black text-black bg-white rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          <Plus size={16} className="mr-2" />
          Request Company
        </button>
      </div>

      {/* Companies Grid */}
      <CompanyGrid companies={companies} />

      {/* Company Request Form Modal */}
      <CompanyRequestForm 
        isOpen={showRequestForm} 
        onClose={() => setShowRequestForm(false)} 
      />
    </>
  )
} 