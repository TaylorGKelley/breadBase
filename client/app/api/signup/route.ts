export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${process.env.API_URL}/api/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify(data), {
      status: 400,
    });
  }

  // TODO: Redirect to next user setup page or bakery setup pages
  return new Response(JSON.stringify({ message: 'Sign Up successful!' }));
}
