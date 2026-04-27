import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Replace with your actual email provider API call.
    // Example for Buttondown:
    // const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    //   method: 'POST',
    //   headers: { Authorization: `Token ${import.meta.env.BUTTONDOWN_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
    // if (!res.ok) throw new Error('Provider error');

    console.log(`[subscribe] New subscriber: ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[subscribe] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
