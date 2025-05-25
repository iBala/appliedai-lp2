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

// GET all repositories with tags as an array using proper many-to-many relationships
export async function GET() {
  console.log('API: Fetching all open source repositories from Supabase using admin client with proper tag mapping');
  console.log('API: Environment check - NODE_ENV:', process.env.NODE_ENV, 'NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET');
  try {
    // Log database connection attempt
    console.log('API: Attempting to connect to Supabase and run query with admin client');
    console.log('API: Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    
    // First, get all repositories
    const { data: repos, error: reposError } = await supabaseAdmin
      .from('ai_open_source_repos')
      .select('*')
      .order('stars_count', { ascending: false }); // Order by stars count descending

    if (reposError) {
      // Check for RLS policy violation
      if (reposError.code === '42501' || reposError.message.includes('policy')) {
        console.error('API ERROR: Row Level Security policy violation detected:', reposError);
        return NextResponse.json({ 
          error: 'Row Level Security policy is blocking access to the repositories table. Please check Supabase RLS policies.',
          details: reposError.message,
          code: reposError.code 
        }, { status: 403 });
      }
      console.error('API ERROR: Error fetching repositories:', reposError);
      return NextResponse.json({ error: reposError.message }, { status: 500 });
    }

    // Then get all tag mappings with tag details using proper joins
    const { data: tagMappings, error: tagsError } = await supabaseAdmin
      .from('ai_repo_tag_map')
      .select(`
        repo_id,
        ai_company_tags!inner(tag)
      `);

    if (tagsError) {
      console.error('API ERROR: Error fetching tag mappings:', tagsError);
      return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }

    // Log query results
    console.log(`API: Query completed. Repositories: ${repos?.length || 0}, Tag mappings: ${tagMappings?.length || 0}`);

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

    // Merge repositories with their tags (repos without tags will have empty array)
    const reposWithTags: RepoWithTags[] = (repos || []).map((repo: Repo) => ({
      ...repo,
      tags: repoTagsMap[repo.id] || [], // Empty array if no tags mapped
    }));

    // Log the tags for debugging - MORE DETAILED LOGGING
    console.log('API: Tag mapping results:');
    console.log('API: Repositories with tags count:', reposWithTags.filter(r => r.tags.length > 0).length);
    console.log('API: Repositories without tags count:', reposWithTags.filter(r => r.tags.length === 0).length);
    console.log('API: Sample repositories with tags:', reposWithTags.filter(r => r.tags.length > 0).slice(0, 2).map(r => ({ 
      id: r.id, 
      name: r.name, 
      tags: r.tags,
      tagCount: r.tags.length 
    })));
    console.log('API: All tag mappings found:', Object.keys(repoTagsMap).length);
    console.log('API: Sample tag mappings:', Object.entries(repoTagsMap).slice(0, 3));
    
    // Log the data being returned (first few items only for brevity)
    const preview = reposWithTags?.slice(0, 2).map(r => ({ id: r.id, name: r.name, tagCount: r.tags.length }));
    console.log('API: Returning data preview:', preview);
    console.log(`API: Total repositories returned: ${reposWithTags?.length || 0}`);
    
    return NextResponse.json({ repos: reposWithTags }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('API CRITICAL ERROR: Repositories API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
} 