import Link from 'next/link';
import React from 'react';

function Dashboard() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <p>Dashboard</p>
      <Link
        href='/Bakery/Create/Menu'
        className='bg-yellow m-3 rounded-full px-8 py-4 text-black'
      >
        Menu Creator
      </Link>
    </main>
  );
}

export default Dashboard;
