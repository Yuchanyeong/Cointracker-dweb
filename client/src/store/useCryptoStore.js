import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCryptoStore = create(
  persist(
    (set, get) => ({
      // 즐겨찾기
      favorites: [],
      toggleFavorite: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((fid) => fid !== id)
            : [...favorites, id],
        });
      },
    }),
    {
      name: "crypto-store", // localStorage key
      // favorites만 저장
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);

export default useCryptoStore;
