import React from 'react';
import { handleLogout } from '../../../../actions/logout';

export default function Account() {
  return (
    <div style={{ color: 'black' }}>
      <h3>My Account!</h3>
      <form action={handleLogout}>
        <button
          style={{
            padding: '1rem 3rem',
            margin: '2rem',
            borderRadius: '1rem',
            cursor: 'pointer',
          }}
          type='submit'
        >
          Logout
        </button>
      </form>
    </div>
  );
}
