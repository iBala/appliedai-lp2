import { NextResponse } from 'next/server';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export async function POST(req: Request) {
  try {
    const { fullName, email, reason } = await req.json();

    // Send to Slack
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `🎯 New Club Application!\n\n*Name:* ${fullName}\n*Email:* ${email}\n\n*Why they want to join:*\n>${reason}`,
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
                text: `*Email:*\n${email}`
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

    if (!response.ok) {
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