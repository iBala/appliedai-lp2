import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// Get Slack webhook URL from environment variables
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { fullName, email, subject, message } = formData;

    // Add debug logging for troubleshooting
    console.log('Attempting to insert contact form data:', {
      type: 'contact-form',
      page: '/contact',
      form_data: formData
    });

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      console.error('Missing required fields in contact form submission');
      return NextResponse.json(
        { error: 'Missing required fields. Please fill in name, email, subject, and message.' },
        { status: 400 }
      );
    }

    // Validate Slack webhook URL
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not found in environment variables');
      throw new Error('Slack webhook URL not configured');
    }

    // First, try to store in Supabase for record keeping
    const { error: supabaseError } = await supabase
      .from('website_submissions')
      .insert([
        {
          type: 'contact-form',
          page: '/contact',
          form_data: formData
        }
      ]);

    // Log the response for debugging
    console.log('Supabase response:', { error: supabaseError });

    if (supabaseError) {
      // Enhanced error logging to understand database issues
      console.error('Supabase error details:', {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code
      });
      throw new Error(`Database error: ${supabaseError.message}`);
    }

    console.log('Successfully stored contact form submission in database');

    // Send notification to Slack using the same webhook as club applications
    const slackPayload = {
      text: `📨 New Contact Form Submission!\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n>${message}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `📨 *New Contact Form Submission!*`
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
              text: `*Email:*\n${email}`
            },
            {
              type: "mrkdwn",
              text: `*Subject:*\n${subject}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n>${message.split('\n').join('\n>')}`
          }
        },
        {
          type: "divider"
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `📅 Submitted: ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    console.log('Sending contact form notification to Slack');
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload),
    });

    if (!slackResponse.ok) {
      console.error('Failed to send notification to Slack:', {
        status: slackResponse.status,
        statusText: slackResponse.statusText
      });
      
      // If Slack fails, we should clean up the database entry to maintain consistency
      await supabase
        .from('website_submissions')
        .delete()
        .match({ 
          type: 'contact-form',
          page: '/contact',
          form_data: formData 
        });
      
      throw new Error('Failed to send notification to Slack');
    }

    console.log('Successfully sent contact form notification to Slack');

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully. We\'ll get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit contact form. Please try again or email us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 