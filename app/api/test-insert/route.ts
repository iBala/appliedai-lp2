import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const testData = {
      type: 'test-insert',
      page: '/test',
      form_data: { test: 'data' }
    };

    console.log('Attempting test insert:', testData);

    const { error } = await supabase
      .from('website_submissions')
      .insert([testData]);

    if (error) {
      console.error('Test insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Test insert error:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
} 