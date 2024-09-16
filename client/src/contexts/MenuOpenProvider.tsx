'use client';

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

type MenuOpenContext = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const MenuOpenContext = React.createContext<MenuOpenContext>({
  menuOpen: false,
  setMenuOpen: () => {},
});

function MenuOpenProvider({
  children,
  value,
}: PropsWithChildren<{ value: boolean }>) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MenuOpenContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuOpenContext.Provider>
  );
}

export default MenuOpenProvider;
