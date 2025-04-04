import { getBeehiivPosts } from '@/lib/beehiiv/api';
import { PostCard } from '@/components/shots/PostCard';
import { PostCardSkeleton } from '@/components/shots/PostCardSkeleton';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CirclesBackground from '@/components/CirclesBackground';
import { SearchBar } from '@/components/shots/SearchBar';
import { SubscribeButton } from '@/components/shots/SubscribeButton';

// Define the search params type
type SearchParamsType = { search?: string }

async function PostsGrid({ searchParams }: { searchParams?: SearchParamsType }) {
  const { data: posts } = await getBeehiivPosts(1, searchParams?.search);

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No newsletters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function NewsletterHero() {
  return (
    <div className="relative overflow-hidden bg-[#0A40C2]">
      {/* Background circles */}
      <div className="absolute inset-0 h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100">
          <CirclesBackground position="right" />
        </div>
      </div>

      <Header theme="dark" disableSticky={true} />
      
      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI concepts made simple
          </h1>
          <p className="mt-6 text-xl text-white/80">
            AI Shots is a daily newsletter that curates the best AI concepts, tools, and resources and explains them in a simple way.
          </p>
          {/* Subscription iframe */}
          <div className="mt-8 flex justify-center">
            <SubscribeButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsletterContent({ searchParams }: { searchParams?: SearchParamsType }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        }>
          <PostsGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default async function ShotsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const resolvedParams = await searchParams;
  return (
    <main className="min-h-screen bg-white">
      <NewsletterHero />
      <NewsletterContent searchParams={resolvedParams} />
      <Footer />
    </main>
  );
} 