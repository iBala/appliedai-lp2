import { Metadata } from 'next'
import { getAllIssues } from '@/lib/issues'
import ResourceHeroSection from '@/components/resources/ResourceHeroSection'
import Footer from '@/components/Footer'

const IssuesIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

export const metadata: Metadata = {
  title: 'Common Issues | AppliedAI Club',
  description: 'Common bugs and issues faced and how to solve them',
}

export default async function IssuesPage() {
  const issues = await getAllIssues()
  
  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Common Issues"
        tagIcon={<IssuesIcon />}
        title="Common Issues"
        description="Common bugs and issues faced and how to solve them"
      />
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-black">Troubleshooting Guides</h2>
            <div className="space-y-4">
              {issues.map((issue) => (
                <a 
                  key={issue.slug}
                  href={`/common-issues/${issue.slug}`}
                  className="block py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-black">
                      {issue.title}
                    </h3>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      className="text-gray-400"
                    >
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 