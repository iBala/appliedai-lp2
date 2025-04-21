import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createBeehiivSubscription } from '@/lib/beehiiv/api';

// Get Slack webhook URL from environment variables
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

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

    // Validate Slack webhook URL
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not found in environment variables');
      throw new Error('Slack webhook URL not configured');
    }

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

    // If email is provided, subscribe to Beehiiv newsletter
    if (email) {
      console.log('Attempting to subscribe to Beehiiv:', email);
      const beehiivSuccess = await createBeehiivSubscription(email);
      if (!beehiivSuccess) {
        console.warn('Failed to subscribe to Beehiiv newsletter:', email);
        // We don't throw here as this is not critical to the signup process
      } else {
        console.log('Successfully subscribed to Beehiiv:', email);
      }
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