import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

export async function GET() {
  console.log('DEBUG TAGS: Starting comprehensive tags check');
  
  try {
    // Check 1: Verify ai_company_tags table exists and has data
    console.log('DEBUG TAGS: Checking ai_company_tags table...');
    const { data: tags, error: tagsError } = await supabaseAdmin
      .from('ai_company_tags')
      .select('*')
      .limit(10);

    // Check 2: Verify ai_company_tag_map table exists and has data
    console.log('DEBUG TAGS: Checking ai_company_tag_map table...');
    const { data: tagMappings, error: mappingsError } = await supabaseAdmin
      .from('ai_company_tag_map')
      .select('*')
      .limit(10);

    // Check 3: Try the join query that the main API uses
    console.log('DEBUG TAGS: Testing join query...');
    const { data: joinData, error: joinError } = await supabaseAdmin
      .from('ai_company_tag_map')
      .select(`
        company_id,
        ai_company_tags!inner(tag)
      `)
      .limit(10);

    // Check 4: Get a few companies to test tag mapping
    console.log('DEBUG TAGS: Getting sample companies...');
    const { data: companies, error: companiesError } = await supabaseAdmin
      .from('ai_companies')
      .select('id, name')
      .limit(5);

    // Create a comprehensive response
    const result = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
      checks: {
        ai_company_tags: {
          success: !tagsError,
          error: tagsError?.message || null,
          count: tags?.length || 0,
          sample: tags?.slice(0, 3) || [],
        },
        ai_company_tag_map: {
          success: !mappingsError,
          error: mappingsError?.message || null,
          count: tagMappings?.length || 0,
          sample: tagMappings?.slice(0, 3) || [],
        },
        join_query: {
          success: !joinError,
          error: joinError?.message || null,
          count: joinData?.length || 0,
          sample: joinData?.slice(0, 3) || [],
        },
        sample_companies: {
          success: !companiesError,
          error: companiesError?.message || null,
          count: companies?.length || 0,
          sample: companies || [],
        }
      }
    };

    console.log('DEBUG TAGS: Completed tags check:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('DEBUG TAGS ERROR:', error);
    return NextResponse.json({
      error: 'Failed to check tags',
      details: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 