import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

// GET all jobs with filtering
export async function GET(request: Request) {
  console.log('API: Fetching jobs using admin client');
  try {
    // Get search parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    
    // Get filter parameters (can be multiple values for each filter)
    const locations = searchParams.getAll('location');
    const roleTypes = searchParams.getAll('role_type');
    const companyIds = searchParams.getAll('company_id');

    console.log(`API: Jobs query params - status: ${status}`);
    console.log(`API: Filter params - locations: ${locations.join(', ') || 'any'}, roleTypes: ${roleTypes.join(', ') || 'any'}, companyIds: ${companyIds.join(', ') || 'any'}`);

    // Start building the query
    let query = supabaseAdmin
      .from('ai_jobs')
      .select(`
        *,
        company:company_id(id, name)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    // Apply filters if they exist
    if (locations.length > 0) {
      query = query.in('location', locations);
    }
    
    if (roleTypes.length > 0) {
      query = query.in('role_type', roleTypes);
    }
    
    if (companyIds.length > 0) {
      query = query.in('company_id', companyIds);
    }
    
    // Execute the query
    const { data, error } = await query;

    if (error) {
      console.error('API ERROR: Error fetching jobs:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`API: Successfully retrieved ${data?.length || 0} jobs`);
    
    // Return the jobs data
    return NextResponse.json({ jobs: data });
  } catch (error) {
    console.error('API CRITICAL ERROR: Jobs API error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
} 