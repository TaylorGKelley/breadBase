import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BakeryStore = {
  id: number;
  title: string;
  setSelectedBakery: (id: number, title: string) => void;
  clearSelectedBakery: () => void;
};

const useSelectedBakery = create<BakeryStore>()(
  persist(
    (set) => ({
      id: 0,
      title: '',
      setSelectedBakery: (id: number, title: string) => set({ id, title }),
      clearSelectedBakery: () => set({ id: 0, title: '' }),
    }),
    {
      name: 'global',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSelectedBakery;
