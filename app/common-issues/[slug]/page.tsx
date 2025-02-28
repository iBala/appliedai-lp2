import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllIssues } from '@/lib/issues'
import ResourceHeroSection from '@/components/resources/ResourceHeroSection'
import Footer from '@/components/Footer'

// Define the Params type
type Params = Promise<{ slug: string }>

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

// Add metadata generation for dynamic routes
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const issues = await getAllIssues()
  const issue = issues.find((i) => i.slug === slug)

  if (!issue) {
    return {
      title: 'Not Found | AppliedAI Club',
      description: 'The requested issue could not be found.',
    }
  }

  return {
    title: `${issue.title} | AppliedAI Club`,
    description: issue.description,
  }
}

// Generate static params for all issues
export async function generateStaticParams() {
  const issues = await getAllIssues()
  return issues.map((issue) => ({
    slug: issue.slug,
  }))
}

export default async function IssuePage({ params }: { params: Params }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const issues = await getAllIssues()
  const issue = issues.find((i) => i.slug === slug)

  if (!issue) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Common Issues"
        tagIcon={<IssuesIcon />}
        title={issue.title}
        description={issue.description}
      />
      
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <article className="prose prose-lg prose-blue max-w-none">
            <MDXRemote source={issue.content} />
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
} 