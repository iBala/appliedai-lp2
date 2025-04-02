import { getBeehiivPost } from '@/lib/beehiiv/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define the params type as a Promise
type Params = Promise<{ id: string }>

export default async function PostPage({
  params,
}: {
  params: Params;
}) {
  // Await the params to get the id
  const resolvedParams = await params;
  console.log('Fetching post with ID:', resolvedParams.id);

  try {
    const post = await getBeehiivPost(resolvedParams.id);
    console.log('Post data received:', post);

    return (
      <div className="min-h-screen bg-white">
        <Header theme="light" />
        <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue mx-auto">
            <div 
              className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-500"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </article>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
} 