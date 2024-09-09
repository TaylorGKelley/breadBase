import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import SearchBar from '@/components/SearchBar';
import React from 'react';

function Search() {
  return (
    <BackgroundImageContainer
      src='/images/Bakery Search.png'
      alt=''
      className='before:bg-black/[65%] before:backdrop-blur-md before:transition-all before:duration-500'
    >
      <main className='flex h-screen flex-col items-center justify-center bg-transparent'>
        <h2>Search</h2>
        <SearchBar />
      </main>
    </BackgroundImageContainer>
  );
}

export default Search;
