import React from 'react';

export default function SignUp() {
  const handleSignUp = async (e: FormData) => {
    'use server';
    const email = e.get('email');
    const password = e.get('password');

    // Handle signup

    return 'success';
  };

  return (
    <div>
      <h4 style={{ color: 'black' }}>Signup</h4>
      <form action={handleSignUp}>
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
