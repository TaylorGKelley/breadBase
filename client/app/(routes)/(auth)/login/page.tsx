'use client';

import React from 'react';
import useAuthStore from '../../../store/authProvider';

export default function Login() {
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type='email' />
      <input type='password' />
      <button type='submit'>Login</button>
    </form>
  );
}
