import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

// GET all available tags for the company request form
export async function GET() {
  console.log('API: Fetching all available tags for company request form');
  
  try {
    const { data: tags, error } = await supabaseAdmin
      .from('ai_company_tags')
      .select('id, tag')
      .order('tag');

    if (error) {
      console.error('API ERROR: Error fetching tags:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`API: Successfully fetched ${tags?.length || 0} tags`);
    
    return NextResponse.json({ 
      tags: tags || [],
      success: true 
    });

  } catch (error) {
    console.error('API CRITICAL ERROR: Tags fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
} 