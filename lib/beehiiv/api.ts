import { BeehiivPost, BeehiivResponse, BeehiivApiResponse } from './types';

const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

export async function getBeehiivPosts(
  page: number = 1,
  searchQuery?: string,
  pageSize: number = 12
): Promise<BeehiivResponse> {
  const url = new URL(`${BEEHIIV_API_URL}/publications/${process.env.BEEHIIV_PUBLICATION_ID_V2}/posts`);
  url.searchParams.set('page', page.toString());
  url.searchParams.set('limit', pageSize.toString());
  url.searchParams.set('status', 'confirmed');  // Only fetch published posts
  if (searchQuery) {
    url.searchParams.set('search', searchQuery);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Filter out any unpublished posts that might slip through
  if (Array.isArray(data.data)) {
    data.data = data.data.filter((post: { status?: string }) => post.status === 'confirmed');
  }

  return data;
}

export async function getBeehiivPost(postId: string): Promise<BeehiivPost> {
  console.log('API: Fetching post with ID:', postId);
  const url = new URL(`${BEEHIIV_API_URL}/publications/${process.env.BEEHIIV_PUBLICATION_ID_V2}/posts/${postId}`);
  
  // Add expand parameters to get both free and premium content
  url.searchParams.append('expand', 'free_web_content');
  url.searchParams.append('expand', 'premium_web_content');
  
  console.log('API: Request URL:', url.toString());
  console.log('API: Using publication ID:', process.env.BEEHIIV_PUBLICATION_ID_V2);
  console.log('API: Using API key:', process.env.BEEHIIV_API_KEY ? 'Present' : 'Missing');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    console.log('API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API: Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }

    const data: BeehiivApiResponse = await response.json();
    console.log('API: Response data structure:', {
      hasData: !!data.data,
      fields: data.data ? Object.keys(data.data) : [],
      hasContent: !!data.data?.content,
      contentTypes: data.data?.content ? Object.keys(data.data.content) : [],
    });

    if (!data.data) {
      throw new Error('Invalid API response: Missing data property');
    }

    // Get content based on audience type (free or premium)
    const content = data.data.content?.premium?.web || 
                   data.data.content?.free?.web || '';

    console.log('Generated content length:', content.length);
    if (content.length > 0) {
      console.log('First 100 chars of content:', content.substring(0, 100));
    }

    return {
      id: data.data.id,
      slug: data.data.slug,
      title: data.data.title,
      subtitle: data.data.subtitle,
      content: content,
      thumbnail_url: data.data.thumbnail_url,
      publishedAt: data.data.publish_date ? 
        new Date(data.data.publish_date * 1000).toISOString() : 
        new Date(data.data.created * 1000).toISOString(),
      author: {
        name: data.data.authors?.[0] || 'Anonymous',
        avatar: undefined // Authors are just strings in the API
      },
      tags: data.data.content_tags || [],
      readTimeMinutes: undefined // Not available in the API response
    };
  } catch (error) {
    console.error('API: Error in getBeehiivPost:', error);
    throw error;
  }
}

/**
 * Creates a new subscription in Beehiiv
 * @param email - The email address to subscribe
 * @returns Promise<boolean> - Whether the subscription was successful
 */
export async function createBeehiivSubscription(email: string): Promise<boolean> {
  if (!email) return false;

  try {
    const url = new URL(`${BEEHIIV_API_URL}/publications/${process.env.BEEHIIV_PUBLICATION_ID_V2}/subscriptions`);
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true, // Reactivate if they previously unsubscribed
        send_welcome_email: false,
        utm_source: 'club_signup'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Beehiiv subscription error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating Beehiiv subscription:', error);
    return false;
  }
} 