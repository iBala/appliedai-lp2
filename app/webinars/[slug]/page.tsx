import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllWebinars } from '@/lib/webinars'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import ResourceHeroSection from '@/components/resources/ResourceHeroSection'
import Footer from '@/components/Footer'

const WebinarIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"/>
    <path d="M12 15l-3-3h6l-3 3z"/>
    <path d="M12 9v3"/>
  </svg>
)

// Updated type to handle Promise params in Next.js 15
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params
  const webinars = await getAllWebinars()
  const webinar = webinars.find((w) => w.slug === resolvedParams.slug)
  
  if (!webinar) {
    return {
      title: 'Webinar Not Found | AppliedAI Club',
      description: 'The requested webinar could not be found.'
    }
  }

  return {
    title: `${webinar.title} | AppliedAI Club`,
    description: webinar.description
  }
}

export async function generateStaticParams() {
  const webinars = await getAllWebinars()
  return webinars.map((webinar) => ({
    slug: webinar.slug,
  }))
}

export default async function WebinarPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const webinars = await getAllWebinars()
  const webinar = webinars.find((w) => w.slug === resolvedParams.slug)
  
  if (!webinar) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Blogs & Webinars"
        tagIcon={<WebinarIcon />}
        title={webinar.title}
        description={webinar.description}
      />
      
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <article className="prose lg:prose-xl [&>h1]:text-black [&>h2]:text-black [&>h3]:text-black [&>h4]:text-black [&>p]:text-gray-600">
            <MDXRemote 
              source={webinar.content}
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