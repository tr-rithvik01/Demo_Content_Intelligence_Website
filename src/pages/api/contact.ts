import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message, company } = body ?? {};

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate Cloudflare Turnstile token
    const token = body['cf-turnstile-response'];
    if (token) {
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: import.meta.env.TURNSTILE_SECRET_KEY ?? '',
          response: token,
        }),
      });
      const result = await verification.json() as { success: boolean };
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Security verification failed' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Replace with your email sending solution (e.g., Resend, SendGrid)
    // const resend = new Resend(import.meta.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'forms@growthmarketinghub.com',
    //   to: 'hello@growthmarketinghub.com',
    //   subject: `[Contact] ${subject} from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    // });

    console.log(`[contact] New message from ${email}: ${subject}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
