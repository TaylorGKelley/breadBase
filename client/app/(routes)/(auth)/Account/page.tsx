import React from 'react';
import { handleLogout } from '../../../actions/logout';

export default function Account() {
  return (
    <form action={handleLogout}>
      <button
        style={{ padding: '1rem', margin: '2rem' }}
        type='submit'
      >
        Logout
      </button>
    </form>
  );
}
