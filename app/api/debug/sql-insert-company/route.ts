import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';

export async function GET() {
  try {
    console.log('DEBUG API: Inserting test company using SQL query');
    
    // Try direct SQL execution
    const testCompanyName = `Test Company SQL ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;
    
    // Using the .from().insert() method instead of raw SQL query
    const { data: directData, error: directError } = await supabaseAdmin
      .from('ai_companies')
      .insert({
        name: testCompanyName,
        about: 'This is a test company inserted via admin client',
        funding_details: 'Seed - $5M',
        location: 'New York, NY',
        home_page: 'https://example.com',
        careers_page: 'https://example.com/careers'
      })
      .select();
      
    if (directError) {
      console.error('DEBUG API ERROR: Insert failed:', directError);
      return NextResponse.json({
        success: false,
        error: directError.message,
        details: directError
      }, { status: 500 });
    }
    
    console.log('DEBUG API: Successfully inserted test company:', directData);
    
    return NextResponse.json({
      success: true,
      company: directData
    });
  } catch (error) {
    console.error('DEBUG API ERROR:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to insert test company',
      details: error
    }, { status: 500 });
  }
} 