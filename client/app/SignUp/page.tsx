import React from 'react';
import { signup } from '../../actions/signup';
import { metamorphous } from '../../ui/fonts';

export default function SignUp() {
  const handleSignUp = async (e: FormData) => {
    'use server';
    const firstName = e.get('firstName');
    const lastName = e.get('lastName');
    const email = e.get('email');
    const password = e.get('password');

    if (!firstName || !lastName || !email || !password)
      return 'Required fields are invalid';

    // Handle signup
    const response = await signup(firstName, lastName, email, password);

    return 'success';
  };

  return (
    <div
      style={{
        color: 'black',
        margin: '2rem auto',
      }}
    >
      <h3 className={metamorphous.className}>Signup</h3>
      <form
        action={handleSignUp}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '350px',
        }}
      >
        <label htmlFor='firstName'>First name:</label>
        <input
          type='text'
          name='firstName'
        />
        <label htmlFor='lastName'>Last name:</label>
        <input
          type='text'
          name='lastName'
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
