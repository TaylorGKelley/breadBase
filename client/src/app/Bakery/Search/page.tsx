'use client';

import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import BakeryMap from '@/components/BakeryMap/BakeryMap';
import Button from '@/components/UI/Button';
import SearchBar from '@/components/SearchBar';
import SearchResultItem from '@/components/SearchResultItem';
import React, { useEffect, useState } from 'react';
import { metamorphous } from '@/ui/fonts';
import distanceBetweenCoords from '@/utils/distanceBetweenCoords';

function Search() {
  const [selectedItemId, setSelectedItemId] = useState<number>(-1);

  // * Temporary until Data fetching is added
  const results = [
    {
      title: 'Small Town Bread',
      description: '1043 Birmingham Rd',
      rating: 3.5,
      lat: 35.028,
      lon: 82.0328,
    },
    {
      title: 'Delicious Delights',
      description: '3410 Prattville Ave',
      rating: 4.5,
      lat: 35.028,
      lon: 81.0328,
    },
    {
      title: 'Sweet Tooth Bakery',
      description: '653 Montgomery Highway',
      rating: 5,
      lat: 34.028,
      lon: 82.0328,
    },
  ];

  return (
    <BackgroundImageContainer
      src='/images/Bakery Search.png'
      alt=''
      className='before:bg-black/[65%] before:backdrop-blur-md before:transition-all before:duration-500'
    >
      <main className='flex h-screen items-center justify-center bg-transparent'>
        <div className='mx-auto flex w-full max-w-6xl flex-col px-4 md:px-8'>
          <h2 className={`${metamorphous.className} mb-4`}>Bakery Search</h2>
          <section className='relative flex w-full max-w-6xl flex-wrap items-stretch justify-stretch gap-8'>
            <div className='flex flex-col gap-4'>
              <SearchBar placeholder='Search...' />
              {results.map((result, index) => (
                <SearchResultItem
                  key={index}
                  info={result}
                  selected={selectedItemId === index}
                  toggleSelected={() => {
                    setSelectedItemId((prev) => (prev !== index ? index : -1));
                  }}
                />
              ))}
              <Button disabled={selectedItemId === -1}>Visit Bakery</Button>
            </div>
            <div className='w-full min-w-80 flex-1 rounded-2xl shadow-2xl shadow-[#222]'>
              <BakeryMap controlsEnabled={true} />
            </div>
          </section>
        </div>
      </main>
    </BackgroundImageContainer>
  );
}

export default Search;
