import { redirect } from 'next/navigation';
import React from 'react';

export default function Login() {
  const handleLogin = async (e: FormData) => {
    'use server';

    try {
      const email = e.get('email');
      const password = e.get('password');
      console.log('Logging in');
      // Handle login
      const response = await fetch(
        `${process.env.API_URL || 'http://localhost:5001'}/api/v1/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );
      // const data = await response.json();
      if (response.ok) {
        console.log('Login successful!');
      }
      console.log(response.ok);
    } catch (error) {
      console.log(error);
      return 'fail';
    }

    redirect('/bakery/signin');
  };

  return (
    <div style={{ color: 'black' }}>
      <h4>Login</h4>
      <form action={handleLogin}>
        <input
          type='email'
          name='email'
        />
        <input
          type='password'
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
