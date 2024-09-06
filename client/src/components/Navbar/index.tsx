'use client';

import React, { useState } from 'react';
import NavTitle from './TitleDisplay';
import NavDropdownMenu from './DropdownMenu';
import AccountInfo from './AccountInfo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='fixed left-1/2 top-0 z-40 flex w-full -translate-x-1/2 flex-row items-center bg-transparent px-4 py-2 backdrop-blur-lg md:px-8'>
      <div className='z-50 flex-1'>
        <NavDropdownMenu menuOpenState={[isMenuOpen, setIsMenuOpen]} />
      </div>
      <div className='xs:flex relative z-50 hidden h-16 w-max flex-col justify-center text-center'>
        <NavTitle closeMenu={handleCloseMenu} />
      </div>
      <div className='z-50 flex flex-1 items-center justify-end'>
        <AccountInfo closeMenu={handleCloseMenu} />
      </div>
    </header>
  );
}
