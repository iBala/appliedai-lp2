import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

// Define interface for table check results
interface TableResult {
  exists: boolean;
  count?: number;
  error?: string | null;
  sample?: unknown[];
}

export async function GET(request: Request) {
  // Get the table name from the query string if provided
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');
  
  try {
    console.log('DEBUG API: Checking database tables');
    
    // If a specific table was requested, check only that one
    if (table) {
      console.log(`DEBUG API: Checking specific table: ${table}`);
      
      // Try to get data from the table directly
      const { data, error } = await supabaseAdmin
        .from(table)
        .select('*')
        .limit(5);
          
      if (error) {
        console.error(`DEBUG API ERROR fetching data from ${table}:`, error);
        return NextResponse.json({ 
          table, 
          exists: false, 
          error: error.message 
        }, { status: 500 });
      }
      
      return NextResponse.json({
        table,
        exists: true,
        count: data?.length || 0,
        sample: data
      });
    }
    
    // Otherwise, try a simpler approach - just check a few key tables directly
    const results: { [tableName: string]: TableResult } = {};
    const tablesToCheck = ['ai_companies', 'ai_jobs', 'website_submissions'];
    
    for (const tableName of tablesToCheck) {
      try {
        const { data, error, count } = await supabaseAdmin
          .from(tableName)
          .select('*', { count: 'exact' })
          .limit(2);
          
        results[tableName] = {
          exists: !error,
          count: count || data?.length || 0,
          error: error ? error.message : null,
          sample: data || undefined
        };
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        results[tableName] = {
          exists: false,
          error: errorMessage
        };
      }
    }
    
    return NextResponse.json({
      tables: results,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      usingServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    });
  } catch (error) {
    console.error('DEBUG API ERROR:', error);
    return NextResponse.json({ error: 'Failed to check database tables' }, { status: 500 });
  }
} 