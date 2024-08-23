import React from 'react';
import { handleLogin } from '../../actions/login';
import Input from '@/components/UI/Input';

function Login() {
  return (
    <div style={{ color: 'black' }}>
      <h4>Login</h4>
      <form action={handleLogin}>
        <Input
          type='text'
          id='email'
          // TODO: Fix the Overflow ISsue for text
          label='emaillooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong'
          placeholder='john.doe@example.com'
        />
        <Input
          type='password'
          id='password'
          label='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
