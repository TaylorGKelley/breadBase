'use client';

import React from 'react';

export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    // const response = await fetch(`${process.env.API_URI}/signin`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    // if (response.ok) {
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ color: 'black' }}>Login</h3>
      <input type='email' />
      <input type='password' />
      <button type='submit'>Login</button>
    </form>
  );
}
