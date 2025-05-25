import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// Get Slack webhook URL from environment variables
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { 
      name, 
      githubUrl, 
      description, 
      homepageUrl, 
      tags, 
      language, 
      license,
      submitterName,
      submitterEmail 
    } = formData;

    // Add debug logging for troubleshooting
    console.log('Attempting to insert repository request data:', {
      type: 'repo-request',
      page: '/repos',
      repo_name: name,
      submitter: submitterEmail
    });

    // Validate required fields
    if (!name || !githubUrl || !description || !tags || !submitterName || !submitterEmail) {
      console.error('Missing required fields in repository request submission');
      return NextResponse.json(
        { error: 'Missing required fields. Please fill in all required fields marked with *.' },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    try {
      const url = new URL(githubUrl);
      if (!url.hostname.includes('github.com')) {
        return NextResponse.json(
          { error: 'Please enter a valid GitHub repository URL.' },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Please enter a valid GitHub repository URL.' },
        { status: 400 }
      );
    }

    // Validate homepage URL if provided
    if (homepageUrl) {
      try {
        new URL(homepageUrl);
      } catch {
        return NextResponse.json(
          { error: 'Please enter a valid homepage URL.' },
          { status: 400 }
        );
      }
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
          type: 'repo-request',
          page: '/repos',
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

    console.log('Successfully stored repository request submission in database');

    // Format tags for Slack
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    // Send notification to Slack
    const slackPayload = {
      text: `🚀 New Repository Request Submission!\n\n*Repository:* ${name}\n*Submitted by:* ${submitterName} (${submitterEmail})\n*GitHub URL:* ${githubUrl}\n*Language:* ${language || 'Not specified'}\n*License:* ${license || 'Not specified'}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🚀 *New Repository Request Submission!*`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Repository Name:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*GitHub URL:*\n<${githubUrl}|${githubUrl}>`
            },
            {
              type: "mrkdwn",
              text: `*Language:*\n${language || 'Not specified'}`
            },
            {
              type: "mrkdwn",
              text: `*License:*\n${license || 'Not specified'}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Description:*\n>${description.split('\n').join('\n>')}`
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
              text: `*Homepage:*\n${homepageUrl ? `<${homepageUrl}|${homepageUrl}>` : 'Not provided'}`
            }
          ]
        },
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
              text: `📅 Submitted: ${new Date().toLocaleString()} | 🤖 Criteria: AI-related open source project`
            }
          ]
        }
      ]
    };

    console.log('Sending repository request notification to Slack');
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload),
    });

    if (!slackResponse.ok) {
      console.error('Failed to send Slack notification:', slackResponse.status, slackResponse.statusText);
      throw new Error('Failed to send notification');
    }

    console.log('Successfully sent repository request notification to Slack');

    return NextResponse.json({ 
      success: true, 
      message: 'Repository request submitted successfully! We\'ll review it and add it to our collection if it meets our criteria.' 
    });

  } catch (error) {
    console.error('Repository request submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit repository request. Please try again.' },
      { status: 500 }
    );
  }
} 