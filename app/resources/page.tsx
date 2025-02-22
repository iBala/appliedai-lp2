import ResourceHeroSection from '@/components/resources/ResourceHeroSection';
import Footer from '@/components/Footer';
import { getAllResources } from '@/lib/resources'

// Resource icon for the header
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
);

export default async function ResourcesPage() {
  const resources = await getAllResources()
  
  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Resources"
        tagIcon={<ResourceIcon />}
        title="AppliedAI Resources"
        description="Detailed guides and resources to help you get started with AI development"
      />
      
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-black">Setting up for coding with AI</h2>
            <div className="space-y-4">
              {resources.map((resource) => (
                <a 
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="block py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-black">
                      {resource.title}
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