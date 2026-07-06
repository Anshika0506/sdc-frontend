export default async function handler(req, res) {
  const targetUrl = 'https://sdc-backend-production.up.railway.app' + req.url.replace(/^\/api/, '');

  // Copy and filter headers
  const headers = {};
  for (const [key, val] of Object.entries(req.headers)) {
    if (key.toLowerCase() === 'host') continue;
    // Set origin to localhost to satisfy backend CORS filter
    if (key.toLowerCase() === 'origin') {
      headers[key] = 'http://localhost:5173';
      continue;
    }
    headers[key] = val;
  }

  // Read request body for POST/PUT requests
  let body = undefined;
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: 'manual'
    });

    // Forward status code
    res.status(response.status);

    // Forward headers
    response.headers.forEach((val, key) => {
      res.setHeader(key, val);
    });

    // Send body
    const responseBody = await response.arrayBuffer();
    res.send(Buffer.from(responseBody));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', message: error.message });
  }
}
