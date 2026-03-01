// app/api/newsletter/route.ts - Newsletter Subscription API
import { NextResponse } from 'next/server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Choose your email service provider and implement
    // Here are examples for popular services:

    // OPTION 1: Mailchimp
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to subscribe');
    }
    */

    // OPTION 2: ConvertKit
    /*
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    */

    // OPTION 3: EmailOctopus
    /*
    const EMAIL_OCTOPUS_API_KEY = process.env.EMAIL_OCTOPUS_API_KEY;
    const EMAIL_OCTOPUS_LIST_ID = process.env.EMAIL_OCTOPUS_LIST_ID;

    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${EMAIL_OCTOPUS_LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: EMAIL_OCTOPUS_API_KEY,
          email_address: email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    */

    // FOR NOW: Just log and return success
    // Remove this and uncomment one of the options above when ready
    console.log('Newsletter subscription:', email);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
