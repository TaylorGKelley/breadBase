import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { BsBasket } from 'react-icons/bs';

import './styles.css';

const Navbar = () => {
  return (
    <header className='navbar'>
      <div className='navbar__logo'>
        <h3>Bread Base</h3>
      </div>
      <nav>
        <ul className='navbar__menu'>
          <li className='navbar__link'>The Bakery</li>
          <li className='navbar__link'>The Shop</li>
        </ul>
      </nav>
      <div className='navbar__account'>
        <div className='navbar__account-cart'>
          <BsBasket />
        </div>
        <div className='navbar__account-profile'>
          <PiUserCircle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
