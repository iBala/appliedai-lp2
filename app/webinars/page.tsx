import { Metadata } from 'next'
import { getAllWebinars } from '@/lib/webinars'
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

export const metadata: Metadata = {
  title: 'Blogs & Webinars | AppliedAI Club',
  description: 'Blog posts and webinars around AI projects',
}

export default async function WebinarsPage() {
  const webinars = await getAllWebinars()
  
  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Blogs & Webinars"
        tagIcon={<WebinarIcon />}
        title="Blogs & Webinars"
        description="Blog posts and webinars around AI projects"
      />
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-black">Latest Content</h2>
            <div className="space-y-4">
              {webinars.map((webinar) => (
                <a 
                  key={webinar.slug}
                  href={`/webinars/${webinar.slug}`}
                  className="block py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-black">
                      {webinar.title}
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