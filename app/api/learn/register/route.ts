import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { learnRegistrationSchema } from '@/lib/validations/learn-registration';
import { getProgramBySlug } from '@/lib/learn/programs';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = learnRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, whatsappNumber, programSlug, programType } = parsed.data;

    const program = getProgramBySlug(programType, programSlug);
    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }

    const pagePath = `/${programType === 'study-group' ? 'study-groups' : 'bootcamps'}/${program.slug}`;

    console.log('Attempting to insert learn registration:', {
      type: 'learn-program-register',
      page: pagePath,
      form_data: parsed.data,
    });

    const { error: supabaseError } = await supabase
      .from('website_submissions')
      .insert([
        {
          type: 'learn-program-register',
          page: pagePath,
          form_data: {
            ...parsed.data,
            programName: program.name,
            cohortLabel: program.cohort.label,
          },
        },
      ]);

    console.log('Supabase response:', { error: supabaseError });

    if (supabaseError) {
      console.error('Supabase error details:', {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code,
      });
      throw new Error(`Database error: ${supabaseError.message}`);
    }

    if (!SLACK_WEBHOOK_URL) {
      throw new Error('Slack webhook URL not configured');
    }

    const slackPayload = {
      text: `📩 New Learn AI Registration\n*Program:* ${program.name}\n*Cohort:* ${program.cohort.label || 'Upcoming'}\n*Name:* ${fullName}\n*Email:* ${email}\n*WhatsApp:* ${whatsappNumber}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `📩 *New Learn AI Registration*`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Program:*\n${program.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Cohort:*\n${program.cohort.label || 'Upcoming'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Name:*\n${fullName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`,
            },
            {
              type: 'mrkdwn',
              text: `*WhatsApp:*\n${whatsappNumber}`,
            },
          ],
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Link: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://appliedai.club'}${pagePath}`,
            },
          ],
        },
      ],
    };

    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload),
    });

    if (!slackResponse.ok) {
      console.error('Failed to send Slack notification for learn registration', {
        status: slackResponse.status,
        statusText: slackResponse.statusText,
      });
      throw new Error('Failed to send Slack notification');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Learn program registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register interest' },
      { status: 500 }
    );
  }
}
