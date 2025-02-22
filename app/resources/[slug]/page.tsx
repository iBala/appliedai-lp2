import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getResourceBySlug, getAllResources } from '@/lib/resources'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import Footer from '@/components/Footer'
import ResourceHeroSection from '@/components/resources/ResourceHeroSection'

const ResourceIcon = () => (
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

// Updated type to handle Promise params in Next.js 15
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params
  const resource = await getResourceBySlug(resolvedParams.slug)
  
  if (!resource) {
    return {
      title: 'Resource Not Found | AppliedAI Club',
      description: 'The requested resource could not be found.'
    }
  }

  return {
    title: `${resource.title} | AppliedAI Club`,
    description: resource.description
  }
}

export async function generateStaticParams() {
  const resources = await getAllResources()
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}

export default async function ResourcePage({ params }: { params: Params }) {
  const resolvedParams = await params
  const resource = await getResourceBySlug(resolvedParams.slug)
  
  if (!resource) {
    return <div>Resource not found</div>
  }

  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Resources"
        tagIcon={<ResourceIcon />}
        title={resource.title}
        description={resource.description}
      />
      
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <article className="prose lg:prose-xl [&>h1]:text-black [&>h2]:text-black [&>h3]:text-black [&>h4]:text-black [&>p]:text-gray-600">
            <MDXRemote 
              source={resource.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeAutolinkHeadings,
                    rehypeHighlight
                  ],
                },
              }}
            />
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
} 