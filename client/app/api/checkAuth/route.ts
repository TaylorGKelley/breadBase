export async function POST(request: Request) {
  const response = await fetch(`${process.env.API_URL}/api/v1/checkAuth`);

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ message: 'Login successful' }));
}
