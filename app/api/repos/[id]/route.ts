import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

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

// interface TagMapping {
//   ai_company_tags: {
//     tag: string;
//   };
// }

// GET specific repository by ID with tags
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('API: Fetching repository by ID');
  
  try {
    const { id } = await params;
    const repoId = parseInt(id);
    
    console.log('API: Processing request for repository ID:', repoId);
    
    if (isNaN(repoId)) {
      return NextResponse.json({ error: 'Invalid repository ID' }, { status: 400 });
    }

    // First, get the repository
    const { data: repo, error: repoError } = await supabaseAdmin
      .from('ai_open_source_repos')
      .select('*')
      .eq('id', repoId)
      .single();

    if (repoError) {
      console.error('API ERROR: Error fetching repository:', repoError);
      if (repoError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
      }
      return NextResponse.json({ error: repoError.message }, { status: 500 });
    }

    // Then get tag mappings for this repository
    const { data: tagMappings, error: tagsError } = await supabaseAdmin
      .from('ai_repo_tag_map')
      .select(`
        ai_company_tags!inner(tag)
      `)
      .eq('repo_id', repoId);

    if (tagsError) {
      console.error('API ERROR: Error fetching tag mappings:', tagsError);
      return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }

    // Extract tags
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = tagMappings?.map((mapping: any) => mapping.ai_company_tags?.tag).filter(Boolean) || [];

    // Merge repository with its tags
    const repoWithTags: RepoWithTags = {
      ...repo,
      tags,
    };

    console.log(`API: Successfully fetched repository ${repoId} with ${tags.length} tags`);
    
    return NextResponse.json({ repo: repoWithTags }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('API CRITICAL ERROR: Repository by ID API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repository' }, { status: 500 });
  }
} 