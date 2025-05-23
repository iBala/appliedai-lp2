import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

export async function POST() {
  console.log('DEBUG CREATE TAGS: Creating sample tags and mappings');
  
  try {
    // First, check if we have any companies to work with
    const { data: companies, error: companiesError } = await supabaseAdmin
      .from('ai_companies')
      .select('id, name')
      .limit(5);

    if (companiesError || !companies || companies.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No companies found to tag',
        details: companiesError?.message || 'Companies table empty'
      }, { status: 400 });
    }

    // Define sample tags
    const sampleTags = [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'AI Infrastructure',
      'LLM',
      'Generative AI',
      'Enterprise AI',
      'AI Tools',
      'Data Science',
      'Robotics'
    ];

    // Step 1: Insert tags if they don't exist
    console.log('DEBUG CREATE TAGS: Inserting sample tags...');
    const { data: insertedTags, error: tagsInsertError } = await supabaseAdmin
      .from('ai_company_tags')
      .upsert(
        sampleTags.map(tag => ({ tag })),
        { onConflict: 'tag', ignoreDuplicates: true }
      )
      .select();

    if (tagsInsertError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to insert tags',
        details: tagsInsertError.message
      }, { status: 500 });
    }

    // Step 2: Get all tags (in case some already existed)
    const { data: allTags, error: allTagsError } = await supabaseAdmin
      .from('ai_company_tags')
      .select('id, tag');

    if (allTagsError || !allTags) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch tags after insertion',
        details: allTagsError?.message
      }, { status: 500 });
    }

    // Step 3: Create random mappings between companies and tags
    console.log('DEBUG CREATE TAGS: Creating company-tag mappings...');
    const mappings = [];
    
    for (const company of companies) {
      // Randomly assign 1-3 tags to each company
      const numTags = Math.floor(Math.random() * 3) + 1;
      const shuffledTags = [...allTags].sort(() => 0.5 - Math.random());
      const selectedTags = shuffledTags.slice(0, numTags);
      
      for (const tag of selectedTags) {
        mappings.push({
          company_id: company.id,
          tag_id: tag.id
        });
      }
    }

    // Insert mappings
    const { data: insertedMappings, error: mappingsError } = await supabaseAdmin
      .from('ai_company_tag_map')
      .upsert(mappings, { ignoreDuplicates: true })
      .select();

    if (mappingsError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to insert tag mappings',
        details: mappingsError.message
      }, { status: 500 });
    }

    // Step 4: Verify the setup by testing the join query
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('ai_company_tag_map')
      .select(`
        company_id,
        ai_company_tags!inner(tag)
      `)
      .limit(10);

    return NextResponse.json({
      success: true,
      results: {
        companies_found: companies.length,
        tags_inserted: insertedTags?.length || 0,
        total_tags: allTags.length,
        mappings_created: insertedMappings?.length || 0,
        verification: {
          success: !verifyError,
          error: verifyError?.message || null,
          sample_mappings: verifyData?.slice(0, 5) || []
        }
      },
      message: 'Sample tags and mappings created successfully'
    });

  } catch (error) {
    console.error('DEBUG CREATE TAGS ERROR:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create sample tags',
      details: String(error)
    }, { status: 500 });
  }
} 