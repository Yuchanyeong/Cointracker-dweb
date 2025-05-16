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

      // 최근 본 코인
      recentCoins: [],
      addRecentCoin: (id) =>
        set((state) => ({
          recentCoins: [
            id,
            ...state.recentCoins.filter((cid) => cid !== id),
          ].slice(0, 10),
        })),

      // (아래는 메모리 상태로만 관리, persist 대상 아님)
      search: "",
      setSearch: (s) => set({ search: s }),
    }),
    {
      name: "crypto-store", // localStorage key
      // partialize로 favorites, recentCoins만 저장
      partialize: (state) => ({
        favorites: state.favorites,
        recentCoins: state.recentCoins,
      }),
    }
  )
);

export default useCryptoStore;
