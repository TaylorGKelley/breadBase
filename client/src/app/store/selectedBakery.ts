import { create } from 'zustand';

type BakeryStore = {
  id: number;
  title: string;
  setSelectedBakery: (id: number, title: string) => void;
};

const useSelectedBakery = create<BakeryStore>((set) => ({
  id: 0,
  title: '',
  setSelectedBakery: (id: number, title: string) => set({ id, title }),
}));

export default useSelectedBakery;
