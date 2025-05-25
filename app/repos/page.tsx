import { Metadata } from 'next'
import Footer from '@/components/Footer'
import RepoHeroSection from '@/components/repos/RepoHeroSection'
import RepoIcon from '@/components/repos/RepoIcon'
import { fetchRepos, type OpenSourceRepo } from '@/lib/fetch-utils'
import ReposClientSection from '@/components/repos/ReposClientSection'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Open Source | AppliedAI Club',
  description: 'Discover powerful AI open source projects and repositories',
}

// Server component to fetch repositories
async function getRepos(): Promise<OpenSourceRepo[]> {
  console.log('PAGE: Starting to fetch repositories');
  try {
    // Use our utility function to fetch repositories
    const repos = await fetchRepos();
    console.log(`PAGE: Successfully fetched ${repos.length} repositories`);
    
    // Log a sample of the repositories received
    if (repos.length > 0) {
      const sample = repos.slice(0, 2).map(r => ({
        id: r.id,
        name: r.name,
        stars_count: r.stars_count
      }));
      console.log('PAGE: Sample of repositories received:', sample);
    } else {
      console.log('PAGE: No repositories received from API');
    }
    
    return repos;
  } catch (error) {
    console.error('PAGE ERROR: Error loading repositories:', error);
    return [];
  }
}

export default async function ReposPage() {
  console.log('PAGE: ReposPage component rendering');
  const repos = await getRepos();
  console.log(`PAGE: Received ${repos.length} repositories to render`);
  
  return (
    <main className="min-h-screen">
      <RepoHeroSection
        tag="Open Source"
        tagIcon={<RepoIcon />}
        title="AI Open Source Projects"
        description="Discover powerful AI open source projects and repositories"
      />
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          {/* Repositories Grid Section - uses the new ReposClientSection client component to bridge server/client boundary */}
          <ReposClientSection repos={repos} />
        </div>
      </section>

      <Footer />
    </main>
  )
} 