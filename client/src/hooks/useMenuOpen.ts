import { MenuOpenContext } from '@/contexts/MenuOpenProvider';
import { useContext } from 'react';

const useMenuOpen = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuOpenContext);

  return { menuOpen, setMenuOpen };
};

export default useMenuOpen;
