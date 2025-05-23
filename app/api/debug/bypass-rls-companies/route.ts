import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

export async function GET() {
  console.log('DEBUG API: Fetching companies with admin client (bypassing RLS)');
  
  try {
    // Show which client is being used (admin vs regular)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isUsingServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('DEBUG API: Using Supabase admin client with service role:', isUsingServiceRole);
    
    // Attempt to query directly with admin client that bypasses RLS
    const { data, error } = await supabaseAdmin
      .from('ai_companies')
      .select('*')
      .order('name');
    
    console.log(`DEBUG API: Query completed. Success: ${!error}, Results count: ${data?.length || 0}`);
    
    if (error) {
      console.error('DEBUG API ERROR: Error fetching companies with admin client:', error);
      return NextResponse.json({
        error: error.message,
        details: error,
        client: {
          url: supabaseUrl,
          usingServiceRole: isUsingServiceRole
        }
      }, { status: 500 });
    }
    
    // Try to also insert a test company if no results
    let insertResult = null;
    if (!data || data.length === 0) {
      console.log('DEBUG API: No companies found, attempting to insert a test company with admin client');
      
      const testCompany = {
        name: 'Test AI Company (Admin)',
        about: 'This is a test AI company added for debugging purposes using admin client.',
        funding_details: 'Seed - $2M',
        location: 'San Francisco, CA',
        home_page: 'https://example.com',
        careers_page: 'https://example.com/careers'
      };
      
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('ai_companies')
        .insert(testCompany)
        .select();
        
      insertResult = {
        success: !insertError,
        data: insertData,
        error: insertError ? insertError.message : null
      };
    }
    
    return NextResponse.json({
      companies: data || [],
      insertResult,
      client: {
        url: supabaseUrl,
        usingServiceRole: isUsingServiceRole
      }
    });
  } catch (error) {
    console.error('DEBUG API CRITICAL ERROR: Companies admin API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch companies with admin client',
      details: error
    }, { status: 500 });
  }
} 