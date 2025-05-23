"use client"
import CompanyGrid from './CompanyGrid'

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
  return <CompanyGrid companies={companies} />
} 