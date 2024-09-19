import Link from 'next/link';
import React from 'react';

function Dashboard() {
  return (
    <main className='flex items-center justify-center'>
      <p>Dashboard</p>
      <Link href='/Bakery/Create/Menu'>Menu Creator</Link>
    </main>
  );
}

export default Dashboard;
