import { Metadata } from 'next'
import Footer from '@/components/Footer'
// import DataStatus from '@/components/debug/DataStatus'
import CompanyHeroSection from '@/components/companies/CompanyHeroSection'
import CompanyIcon from '@/components/companies/CompanyIcon'
import { fetchCompanies, type Company } from '@/lib/fetch-utils'
import CompaniesClientSection from '@/components/companies/CompaniesClientSection'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Companies | AppliedAI Club',
  description: 'List of AI companies we are tracking',
}

// Server component to fetch companies
async function getCompanies(): Promise<Company[]> {
  console.log('PAGE: Starting to fetch companies');
  try {
    // Use our utility function to fetch companies
    const companies = await fetchCompanies();
    console.log(`PAGE: Successfully fetched ${companies.length} companies`);
    
    // Log a sample of the companies received
    if (companies.length > 0) {
      const sample = companies.slice(0, 2).map(c => ({
        id: c.id,
        name: c.name
      }));
      console.log('PAGE: Sample of companies received:', sample);
    } else {
      console.log('PAGE: No companies received from API');
    }
    
    return companies;
  } catch (error) {
    console.error('PAGE ERROR: Error loading companies:', error);
    return [];
  }
}

export default async function CompaniesPage() {
  console.log('PAGE: CompaniesPage component rendering');
  const companies = await getCompanies();
  console.log(`PAGE: Received ${companies.length} companies to render`);
  
  return (
    <main className="min-h-screen">
      <CompanyHeroSection
        tag="Companies"
        tagIcon={<CompanyIcon />}
        title="AI Companies"
        description="Discover the most promising AI companies we are tracking"
      >
        {/* <DataStatus /> */}
      </CompanyHeroSection>
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          {/* Companies Grid Section - now uses the new CompaniesClientSection client component to bridge server/client boundary */}
          <CompaniesClientSection companies={companies} />
        </div>
      </section>

      <Footer />
    </main>
  )
} 