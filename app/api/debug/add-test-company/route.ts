import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    console.log('DEBUG API: Adding test company to database');
    
    // Create a test company
    const testCompany = {
      name: 'Test AI Company',
      about: 'This is a test AI company added for debugging purposes.',
      funding_details: 'Seed - $2M',
      location: 'San Francisco, CA',
      home_page: 'https://example.com',
      careers_page: 'https://example.com/careers'
    };
    
    // Insert the test company
    const { data, error } = await supabase
      .from('ai_companies')
      .insert(testCompany)
      .select();
      
    if (error) {
      console.error('DEBUG API ERROR adding test company:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      }, { status: 500 });
    }
    
    console.log('DEBUG API: Successfully added test company:', data);
    
    return NextResponse.json({
      success: true,
      message: 'Test company added successfully',
      company: data
    });
  } catch (error) {
    console.error('DEBUG API ERROR:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to add test company',
      details: error
    }, { status: 500 });
  }
} 