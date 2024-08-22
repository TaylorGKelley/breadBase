import React from 'react';
import { handleLogout } from '../../../actions/logout';

export default function Account() {
  return (
    <div className='text-slate-950 mx-auto'>
      <h3>My Account!</h3>
      <form
        action={handleLogout}
        className='flex flex-col items-center mt-4'
      >
        <button
          type='submit'
          className='px-10 py-5 bg-yellow text-slate-50 font-semibold rounded-3xl'
        >
          Logout
        </button>
      </form>
    </div>
  );
}
