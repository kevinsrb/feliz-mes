# feliz-mes

SPA hecha con Astro para una sorpresa romántica. Mantiene el flujo original: entrada bloqueada por nombre, ruleta de cita, selector de hora y pantalla final con el detalle.

## How it works

1. The page unlocks when the recipient types the correct name.
2. Una ruleta tipo slot-machine elige una actividad.
3. Ella escoge una hora.
4. La pantalla final muestra el mensaje y envía la respuesta por WhatsApp usando CallMeBot.

## Setup

Instala dependencias:

```bash
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```env
CALLMEBOT_PHONE="+573001234567"
CALLMEBOT_API_KEY="tu_api_key"
```

`CALLMEBOT_PHONE` debe ser tu número de WhatsApp con código de país, el mismo autorizado en CallMeBot.

Ejecuta en local:

```bash
npm run dev
```

Para producción:

```bash
npm run build
npm run preview
```

## Stack

Astro con salida server-side para proteger la `apiKey` en variables de entorno.
