import React from 'react';
import NavTitle from './TitleDisplay';
import NavDropdownMenu from './DropdownMenu';
import AccountInfo from './AccountInfo';

export default function Navbar() {
  return (
    <header className='fixed left-1/2 top-0 z-40 flex w-full -translate-x-1/2 flex-row items-center px-4 py-2 md:px-8'>
      <div className='z-50 flex-1'>
        <NavDropdownMenu />
      </div>
      <div className='relative z-50 flex h-16 w-max flex-col justify-center text-center'>
        <NavTitle />
      </div>
      <div className='z-50 flex flex-1 items-center justify-end'>
        <AccountInfo />
      </div>
    </header>
  );
}
