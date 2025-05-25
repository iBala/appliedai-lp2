import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';
import { createClient } from '@supabase/supabase-js';

// TypeScript interfaces
interface Repo {
  id: number;
  name: string;
  description: string;
  github_url: string;
  homepage_url?: string;
  stars_count: number;
  language?: string;
  license?: string;
  like_count?: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // For other database fields
}

interface RepoWithTags extends Repo {
  tags: string[];
}

// GET endpoint for fetching user's liked repositories
export async function GET(request: Request) {
  console.log('API: Fetching user\'s liked repositories');
  
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('API: No valid authorization header found');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Create a Supabase client with the user's token for authentication
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // Get the current user from the token
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('API ERROR: Error getting user from token:', userError);
      return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
    }

    console.log('API: Authenticated user:', user.email, 'fetching liked repositories');

    // Use user email as the user identifier for consistency
    const userIdentifier = user.email!;

    // Get all repository IDs that the user has liked
    const { data: likedRepoIds, error: likesError } = await supabaseAdmin
      .from('repo_likes')
      .select('repo_id')
      .eq('user_identifier', userIdentifier);

    if (likesError) {
      console.error('API ERROR: Error fetching user likes:', likesError);
      return NextResponse.json({ error: 'Failed to fetch liked repositories' }, { status: 500 });
    }

    // If user hasn't liked any repositories, return empty array
    if (!likedRepoIds || likedRepoIds.length === 0) {
      console.log('API: User has no liked repositories');
      return NextResponse.json({ repos: [] });
    }

    // Extract repository IDs
    const repoIds = likedRepoIds.map(like => like.repo_id);
    console.log('API: User has liked', repoIds.length, 'repositories:', repoIds);

    // Fetch the full repository details for liked repositories
    const { data: repos, error: reposError } = await supabaseAdmin
      .from('ai_open_source_repos')
      .select('*')
      .in('id', repoIds)
      .order('stars_count', { ascending: false }); // Order by stars count descending

    if (reposError) {
      console.error('API ERROR: Error fetching repository details:', reposError);
      return NextResponse.json({ error: 'Failed to fetch repository details' }, { status: 500 });
    }

    // Get tag mappings for these repositories
    const { data: tagMappings, error: tagsError } = await supabaseAdmin
      .from('ai_repo_tag_map')
      .select(`
        repo_id,
        ai_company_tags!inner(tag)
      `)
      .in('repo_id', repoIds);

    if (tagsError) {
      console.error('API ERROR: Error fetching tag mappings:', tagsError);
      return NextResponse.json({ error: 'Failed to fetch repository tags' }, { status: 500 });
    }

    // Create a map of repo_id to tags array
    const repoTagsMap: { [repoId: number]: string[] } = {};
    
    // Group tags by repo_id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tagMappings?.forEach((mapping: any) => {
      const repoId = mapping.repo_id;
      const tag = mapping.ai_company_tags?.tag;
      
      if (tag) {
        if (!repoTagsMap[repoId]) {
          repoTagsMap[repoId] = [];
        }
        repoTagsMap[repoId].push(tag);
      }
    });

    // Merge repositories with their tags
    const reposWithTags: RepoWithTags[] = (repos || []).map((repo: Repo) => ({
      ...repo,
      tags: repoTagsMap[repo.id] || [], // Empty array if no tags mapped
    }));

    console.log(`API: Successfully fetched ${reposWithTags.length} liked repositories for user ${userIdentifier}`);
    
    return NextResponse.json({ repos: reposWithTags }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });

  } catch (error) {
    console.error('API CRITICAL ERROR: Liked repositories API error:', error);
    return NextResponse.json({ error: 'Failed to fetch liked repositories' }, { status: 500 });
  }
} 