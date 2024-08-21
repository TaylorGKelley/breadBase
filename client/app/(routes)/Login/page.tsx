import React from 'react';
import { handleLogin } from '../../actions/login';

export default function Login() {
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
