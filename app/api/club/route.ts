import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { fullName, email, whatsappNumber, linkedInUrl, reason } = formData;

    // Add debug logging
    console.log('Attempting to insert data:', {
      type: 'club-signup',
      page: '/club',
      form_data: formData
    });

    // First, try to store in Supabase
    const { error: supabaseError } = await supabase
      .from('website_submissions')
      .insert([
        {
          type: 'club-signup',
          page: '/club',
          form_data: formData
        }
      ]);

    // Log the response
    console.log('Supabase response:', { error: supabaseError });

    if (supabaseError) {
      // Enhanced error logging
      console.error('Supabase error details:', {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code
      });
      throw new Error(`Database error: ${supabaseError.message}`);
    }

    // Log successful insert
    console.log('Successfully inserted data');

    // If database insert succeeds, send to Slack
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `🎯 New Club Application!\n\n*Name:* ${fullName}\n*WhatsApp:* ${whatsappNumber}${email ? `\n*Email:* ${email}` : ''}\n*LinkedIn:* ${linkedInUrl}\n\n*Why they want to join:*\n>${reason}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `🎯 *New Club Application!*`
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Name:*\n${fullName}`
              },
              {
                type: "mrkdwn",
                text: `*WhatsApp:*\n${whatsappNumber}`
              },
              {
                type: "mrkdwn",
                text: `*Email:*\n${email || 'Not provided'}`
              },
              {
                type: "mrkdwn",
                text: `*LinkedIn:*\n${linkedInUrl}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Why they want to join:*\n>${reason.split('\n').join('\n>')}`
            }
          }
        ]
      }),
    });

    if (!slackResponse.ok) {
      // If Slack fails, we should probably clean up the database entry
      await supabase
        .from('website_submissions')
        .delete()
        .match({ 
          type: 'club-signup',
          page: '/club',
          form_data: formData 
        });
      throw new Error('Failed to send to Slack');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Club application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 