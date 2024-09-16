import React from 'react';
import type Bakery from '@/types/Bakery';

async function Bakery({ params }: { params: { bakeryId: string } }) {
  const response = await fetch(
    `http://localhost:5000/api/bakery/${params.bakeryId}`,
  );
  const bakery = (await response.json()) as Bakery;

  return (
    <main>
      <h1>{bakery.title}</h1>
    </main>
  );
}

export default Bakery;
