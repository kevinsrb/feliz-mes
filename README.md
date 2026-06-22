# feliz-mes

SPA hecha con Astro para una sorpresa romantica. Mantiene el flujo original: entrada bloqueada por nombre, ruleta para escoger la cita, selector de hora y pantalla final con el detalle.

## Como funciona

1. La pagina se desbloquea cuando la persona escribe el nombre correcto.
2. Una ruleta tipo slot-machine escoge una actividad.
3. La persona selecciona una hora.
4. La pantalla final muestra el mensaje y envia la respuesta a WhatsApp usando CallMeBot.

## Instalacion

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```env
CALLMEBOT_PHONE="+573001234567"
CALLMEBOT_API_KEY="tu_api_key"
```

`CALLMEBOT_PHONE` debe ser tu numero de WhatsApp con codigo de pais. Debe ser el mismo numero autorizado en CallMeBot.

## CallMeBot WhatsApp API

Esta app usa la API gratuita de CallMeBot para enviar la respuesta por WhatsApp. Documentacion oficial:

https://www.callmebot.com/es/blog/api-gratis-mensajes-whatsapp/

Segun la documentacion, primero debes activar tu numero:

1. Agrega el bot de CallMeBot a tus contactos.
2. Envia por WhatsApp el mensaje de autorizacion indicado por CallMeBot.
3. Espera la respuesta del bot con tu `apiKey`.
4. Usa ese valor en `CALLMEBOT_API_KEY`.

La llamada oficial usa este formato:

```txt
https://api.callmebot.com/whatsapp.php?phone=[phone_number]&text=[message]&apikey=[your_apikey]
```

En esta app esa llamada no se hace desde el navegador. El frontend envia la seleccion a `/api/send-whatsapp` y Astro llama a CallMeBot desde el servidor, asi la `apiKey` queda protegida en variables de entorno.

## Ejecutar en local

```bash
npm run dev
```

Luego abre:

```txt
http://127.0.0.1:4321
```

## Despliegue en Vercel

El proyecto usa `@astrojs/vercel`, asi que esta listo para desplegar en Vercel con salida server-side.

En Vercel agrega estas variables en `Project Settings > Environment Variables`:

```env
CALLMEBOT_PHONE="+573001234567"
CALLMEBOT_API_KEY="tu_api_key"
```

Para validar el build:

```bash
npm run build
```

## Stack

- Astro
- Adapter de Vercel
- Endpoint server-side en `/api/send-whatsapp`
- CallMeBot WhatsApp API
