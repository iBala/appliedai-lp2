import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Star, GitFork, Calendar, Code, Scale, Globe } from 'lucide-react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { fetchRepoWithDetails, type OpenSourceRepo } from '@/lib/fetch-utils'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface RepoPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: RepoPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const repo = await fetchRepoWithDetails(id)
    return {
      title: `${repo.name} | AppliedAI Club`,
      description: repo.description,
    }
  } catch {
    return {
      title: 'Repository Not Found | AppliedAI Club',
      description: 'The requested repository could not be found.',
    }
  }
}

// Server component to fetch repository data
async function getRepo(id: string): Promise<OpenSourceRepo | null> {
  console.log('PAGE: Starting to fetch repository with ID:', id);
  try {
    const repo = await fetchRepoWithDetails(id);
    console.log(`PAGE: Successfully fetched repository: ${repo.name}`);
    return repo;
  } catch (error) {
    console.error('PAGE ERROR: Error loading repository:', error);
    return null;
  }
}

export default async function RepoPage({ params }: RepoPageProps) {
  console.log('PAGE: RepoPage component rendering');
  const { id } = await params;
  console.log('PAGE: Processing repository ID:', id);
  const repo = await getRepo(id);
  
  if (!repo) {
    console.log('PAGE: Repository not found, showing 404');
    notFound();
  }

  console.log(`PAGE: Rendering repository page for: ${repo.name}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header theme="light" disableSticky={true} />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/repos"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Open Source Projects
            </Link>
          </div>

          {/* Repository Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {repo.name}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {repo.description}
                </p>

                {/* Repository Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{repo.stars_count.toLocaleString()}</span>
                    <span>stars</span>
                  </div>
                  
                  {repo.language && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Code className="h-4 w-4 text-blue-500" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  {repo.license && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Scale className="h-4 w-4 text-green-500" />
                      <span>{repo.license}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Added {new Date(repo.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Tags */}
                {repo.tags && repo.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {repo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <a
                href={repo.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <GitFork className="h-5 w-5 mr-2" />
                View on GitHub
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              
              {repo.homepage_url && (
                <a
                  href={repo.homepage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Visit Homepage
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Repository Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">GitHub URL</h3>
                <a 
                  href={repo.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  {repo.github_url}
                </a>
              </div>
              
              {repo.homepage_url && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Homepage</h3>
                  <a 
                    href={repo.homepage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {repo.homepage_url}
                  </a>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Stars</h3>
                <p className="text-gray-900">{repo.stars_count.toLocaleString()}</p>
              </div>
              
              {repo.language && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Primary Language</h3>
                  <p className="text-gray-900">{repo.language}</p>
                </div>
              )}
              
              {repo.license && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">License</h3>
                  <p className="text-gray-900">{repo.license}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Added to Collection</h3>
                <p className="text-gray-900">{new Date(repo.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 