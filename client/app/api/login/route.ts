export async function POST(request: Request) {
  // Get the form data
  const body = await request.json();
  const { email, password } = body;
  // Needs email and password
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Email and password required' }),
      {
        status: 400,
      },
    );
  }
  // Make the api call to server
  const response = await fetch(`${process.env.API_URL}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  // If everything goes through, redirect
  if (response.ok) {
    // TODO: Redirect to profile
    return Response.redirect('/', 302);
  }

  return new Response(JSON.stringify(data), {
    status: response.status,
  });
}
