import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

// TypeScript interfaces
// interface TagMapping {
//   company_id: number;
//   ai_company_tags: {
//     tag: string;
//   } | null;
// }

interface Company {
  id: number;
  name: string;
  about: string;
  home_page: string;
  logo?: string;
  like_count?: number;
  [key: string]: unknown; // For other database fields
}

interface CompanyWithTags extends Company {
  tags: string[];
}

// GET all companies with tags as an array using proper many-to-many relationships
export async function GET() {
  console.log('API: Fetching all companies from Supabase using admin client with proper tag mapping');
  try {
    // Log database connection attempt
    console.log('API: Attempting to connect to Supabase and run query with admin client');
    
    // First, get all companies
    const { data: companies, error: companiesError } = await supabaseAdmin
      .from('ai_companies')
      .select('*')
      .order('name');

    if (companiesError) {
      // Check for RLS policy violation
      if (companiesError.code === '42501' || companiesError.message.includes('policy')) {
        console.error('API ERROR: Row Level Security policy violation detected:', companiesError);
        return NextResponse.json({ 
          error: 'Row Level Security policy is blocking access to the companies table. Please check Supabase RLS policies.',
          details: companiesError.message,
          code: companiesError.code 
        }, { status: 403 });
      }
      console.error('API ERROR: Error fetching companies:', companiesError);
      return NextResponse.json({ error: companiesError.message }, { status: 500 });
    }

    // Then get all tag mappings with tag details using proper joins
    const { data: tagMappings, error: tagsError } = await supabaseAdmin
      .from('ai_company_tag_map')
      .select(`
        company_id,
        ai_company_tags!inner(tag)
      `);

    if (tagsError) {
      console.error('API ERROR: Error fetching tag mappings:', tagsError);
      return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }

    // Log query results
    console.log(`API: Query completed. Companies: ${companies?.length || 0}, Tag mappings: ${tagMappings?.length || 0}`);

    // Create a map of company_id to tags array
    const companyTagsMap: { [companyId: number]: string[] } = {};
    
    // Group tags by company_id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tagMappings?.forEach((mapping: any) => {
      const companyId = mapping.company_id;
      const tag = mapping.ai_company_tags?.tag;
      
      if (tag) {
        if (!companyTagsMap[companyId]) {
          companyTagsMap[companyId] = [];
        }
        companyTagsMap[companyId].push(tag);
      }
    });

    // Merge companies with their tags (companies without tags will have empty array)
    const companiesWithTags: CompanyWithTags[] = (companies || []).map((company: Company) => ({
      ...company,
      tags: companyTagsMap[company.id] || [], // Empty array if no tags mapped
    }));

    // Log the tags for debugging
    console.log('API: Example company tags:', companiesWithTags.slice(0, 2).map(c => ({ id: c.id, name: c.name, tags: c.tags })));
    
    // Log the data being returned (first few items only for brevity)
    const preview = companiesWithTags?.slice(0, 2).map(c => ({ id: c.id, name: c.name, tagCount: c.tags.length }));
    console.log('API: Returning data preview:', preview);
    console.log(`API: Total companies returned: ${companiesWithTags?.length || 0}`);
    
    return NextResponse.json({ companies: companiesWithTags });
  } catch (error) {
    console.error('API CRITICAL ERROR: Companies API error:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
} 