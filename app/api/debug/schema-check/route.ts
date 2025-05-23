import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

interface TableCheck {
  exists: boolean;
  error?: string;
  hasData?: boolean;
}

export async function GET() {
  console.log('DEBUG SCHEMA: Checking database schema');
  
  try {
    // Try to query information_schema to see what tables exist
    // Note: This might not work with RLS, but let's try
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['ai_companies', 'ai_company_tags', 'ai_company_tag_map', 'company_likes']);

    // Alternative approach - try to access each table individually
    const tableChecks: Record<string, TableCheck> = {};
    
    // Check ai_companies
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_companies')
        .select('count')
        .limit(1);
      tableChecks['ai_companies'] = { exists: !error, error: error?.message, hasData: !!data };
    } catch (e) {
      tableChecks['ai_companies'] = { exists: false, error: String(e) };
    }

    // Check ai_company_tags
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_company_tags')
        .select('count')
        .limit(1);
      tableChecks['ai_company_tags'] = { exists: !error, error: error?.message, hasData: !!data };
    } catch (e) {
      tableChecks['ai_company_tags'] = { exists: false, error: String(e) };
    }

    // Check ai_company_tag_map
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_company_tag_map')
        .select('count')
        .limit(1);
      tableChecks['ai_company_tag_map'] = { exists: !error, error: error?.message, hasData: !!data };
    } catch (e) {
      tableChecks['ai_company_tag_map'] = { exists: false, error: String(e) };
    }

    // Check company_likes
    try {
      const { data, error } = await supabaseAdmin
        .from('company_likes')
        .select('count')
        .limit(1);
      tableChecks['company_likes'] = { exists: !error, error: error?.message, hasData: !!data };
    } catch (e) {
      tableChecks['company_likes'] = { exists: false, error: String(e) };
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
      information_schema: {
        success: !tablesError,
        error: tablesError?.message || null,
        tables: tables || [],
      },
      individual_table_checks: tableChecks,
      summary: {
        all_tables_exist: Object.values(tableChecks).every((check: TableCheck) => check.exists),
        missing_tables: Object.entries(tableChecks)
          .filter(([, check]: [string, TableCheck]) => !check.exists)
          .map(([name]) => name),
      }
    });

  } catch (error) {
    console.error('DEBUG SCHEMA ERROR:', error);
    return NextResponse.json({
      error: 'Failed to check schema',
      details: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 