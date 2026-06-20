import type { APIRoute } from 'astro';

const CALLMEBOT_URL = 'https://api.callmebot.com/whatsapp.php';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const phone = import.meta.env.CALLMEBOT_PHONE;
  const apiKey = import.meta.env.CALLMEBOT_API_KEY;

  if (!phone || !apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing CALLMEBOT_PHONE or CALLMEBOT_API_KEY' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload: { plan?: string; hora?: string; mensaje?: string; fecha?: string };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const message = [
    '*Nueva respuesta de Feliz Mes*',
    payload.fecha ? `Fecha: ${payload.fecha}` : '',
    payload.plan ? `Plan: ${payload.plan}` : '',
    payload.hora ? `Hora: ${payload.hora}` : '',
    payload.mensaje ? `Mensaje: ${payload.mensaje}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams({
    phone,
    text: message,
    apikey: apiKey
  });

  try {
    const response = await fetch(`${CALLMEBOT_URL}?${params.toString()}`);
    const text = await response.text();

    if (!response.ok) {
      return new Response(JSON.stringify({ ok: false, error: text || response.statusText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Unable to reach CallMeBot' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
