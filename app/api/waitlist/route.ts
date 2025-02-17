import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { email, agentType } = formData;

    // Add debug logging
    console.log('Attempting to insert waitlist data:', {
      type: 'agent-waitlist',
      page: `/agents/${agentType.toLowerCase()}`,
      form_data: formData
    });

    // First, try to store in Supabase
    const { error: supabaseError } = await supabase
      .from('website_submissions')
      .insert([
        {
          type: 'agent-waitlist',
          page: `/agents/${agentType.toLowerCase()}`,
          form_data: formData
        }
      ]);

    // Log the response
    console.log('Supabase response:', { error: supabaseError });

    if (supabaseError) {
      console.error('Supabase error details:', {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code
      });
      throw new Error(`Database error: ${supabaseError.message}`);
    }

    // Log successful insert
    console.log('Successfully inserted waitlist data');

    // If database insert succeeds, send to Slack
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `🎉 New Waitlist Signup!\nAgent: ${agentType}\nEmail: ${email}`,
      }),
    });

    if (!slackResponse.ok) {
      console.error('Slack notification failed, cleaning up database entry');
      // If Slack fails, clean up the database entry
      await supabase
        .from('website_submissions')
        .delete()
        .match({ 
          type: 'agent-waitlist',
          page: `/agents/${agentType.toLowerCase()}`,
          form_data: formData 
        });
      throw new Error('Failed to send to Slack');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit to waitlist' },
      { status: 500 }
    );
  }
} 