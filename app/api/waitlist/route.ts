import { NextResponse } from 'next/server';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export async function POST(req: Request) {
  try {
    const { email, agentType } = await req.json();

    // Send to Slack
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `🎉 New Waitlist Signup!\nAgent: ${agentType}\nEmail: ${email}`,
      }),
    });

    if (!response.ok) {
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