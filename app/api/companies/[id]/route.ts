import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

// GET a specific company and its jobs
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`API: Fetching company id ${id} and its jobs using admin client`);
    
    // First, fetch the company details
    const { data: company, error: companyError } = await supabaseAdmin
      .from('ai_companies')
      .select('*')
      .eq('id', id)
      .single();

    if (companyError) {
      console.error('Error fetching company:', companyError);
      return NextResponse.json({ error: companyError.message }, { status: companyError.code === 'PGRST116' ? 404 : 500 });
    }
    
    // Then fetch jobs for this company
    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from('ai_jobs')
      .select('*')
      .eq('company_id', id)
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    
    if (jobsError) {
      console.error('Error fetching jobs:', jobsError);
      return NextResponse.json({ error: jobsError.message }, { status: 500 });
    }

    console.log(`API: Successfully retrieved company with ${jobs?.length || 0} jobs`);

    // Return company with its jobs
    return NextResponse.json({ 
      company,
      jobs: jobs || []
    });
  } catch (error) {
    console.error('Company detail API error:', error);
    return NextResponse.json({ error: 'Failed to fetch company details' }, { status: 500 });
  }
} 