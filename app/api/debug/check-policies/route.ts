import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    console.log('DEBUG API: Checking RLS policies');
    
    // Check if the service role key is available - this bypasses RLS
    const isUsingServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ? true : false;
    
    // Get current auth status
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    // Try to query the policies
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'ai_companies');
    
    // Try to check RLS policies using SQL directly
    const { data: rlsPolicies, error: rlsError } = await supabase
      .rpc('show_policies', { table_name: 'ai_companies' })
      .select('*');
      
    return NextResponse.json({
      auth: {
        isLoggedIn: !!user,
        user: user ? { id: user.id, email: user.email } : null,
        isUsingServiceRole,
        authError: authError?.message || null
      },
      policies: {
        pgPolicies: policies || [],
        pgPoliciesError: policiesError?.message || null,
        rlsPolicies: rlsPolicies || [],
        rlsError: rlsError?.message || null,
      },
      diagnosticQueries: {
        pgPoliciesQuery: "SELECT * FROM pg_policies WHERE tablename = 'ai_companies'",
        rlsPoliciesQuery: "SELECT * FROM rls.fn_show_policies('ai_companies')"
      }
    });
  } catch (error) {
    console.error('DEBUG API ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to check RLS policies',
      details: error
    }, { status: 500 });
  }
} 