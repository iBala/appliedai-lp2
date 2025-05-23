import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// Get Slack webhook URL from environment variables
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { 
      name, 
      homePage, 
      about, 
      logo, 
      tags, 
      careersSite, 
      fundingDetails, 
      hqLocation,
      submitterName,
      submitterEmail 
    } = formData;

    // Add debug logging for troubleshooting
    console.log('Attempting to insert company request data:', {
      type: 'company-request',
      page: '/companies',
      company_name: name,
      submitter: submitterEmail
    });

    // Validate required fields
    if (!name || !homePage || !about || !tags || !fundingDetails || !hqLocation || !submitterName || !submitterEmail) {
      console.error('Missing required fields in company request submission');
      return NextResponse.json(
        { error: 'Missing required fields. Please fill in all required fields marked with *.' },
        { status: 400 }
      );
    }

    // Validate URL format for home page
    try {
      new URL(homePage);
    } catch {
      return NextResponse.json(
        { error: 'Please enter a valid URL for the company home page.' },
        { status: 400 }
      );
    }

    // Validate careers site URL if provided
    if (careersSite) {
      try {
        new URL(careersSite);
      } catch {
        return NextResponse.json(
          { error: 'Please enter a valid URL for the careers site.' },
          { status: 400 }
        );
      }
    }

    // Validate funding details length
    if (fundingDetails.length > 10) {
      return NextResponse.json(
        { error: 'Funding details must be 10 characters or less.' },
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
          type: 'company-request',
          page: '/companies',
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

    console.log('Successfully stored company request submission in database');

    // Format tags for Slack
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    // Send notification to Slack
    const slackPayload = {
      text: `🏢 New Company Request Submission!\n\n*Company:* ${name}\n*Submitted by:* ${submitterName} (${submitterEmail})\n*Home Page:* ${homePage}\n*Funding:* ${fundingDetails}\n*HQ:* ${hqLocation}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🏢 *New Company Request Submission!*`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Company Name:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*Home Page:*\n<${homePage}|${homePage}>`
            },
            {
              type: "mrkdwn",
              text: `*Funding Details:*\n${fundingDetails}`
            },
            {
              type: "mrkdwn",
              text: `*HQ Location:*\n${hqLocation}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*About:*\n>${about.split('\n').join('\n>')}`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Tags:*\n${tagsString}`
            },
            {
              type: "mrkdwn",
              text: `*Careers Site:*\n${careersSite ? `<${careersSite}|${careersSite}>` : 'Not provided'}`
            }
          ]
        },
        ...(logo ? [{
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Logo:*\n${logo}`
          }
        }] : []),
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Submitted by:*\n${submitterName}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${submitterEmail}`
            }
          ]
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `📅 Submitted: ${new Date().toLocaleString()} | 💡 Criteria: AI-first, >$1M funding/revenue`
            }
          ]
        }
      ]
    };

    console.log('Sending company request notification to Slack');
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
          type: 'company-request',
          page: '/companies',
          form_data: formData 
        });
      
      throw new Error('Failed to send notification to Slack');
    }

    console.log('Successfully sent company request notification to Slack');

    return NextResponse.json({ 
      success: true, 
      message: 'Company request submitted successfully! We\'ll review it and get back to you soon.' 
    });

  } catch (error) {
    console.error('Company request submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit company request. Please try again or contact us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 