import { create } from "zustand";

const useIsLoginStore = create((set) => ({
  isLogin: false,
  userInfo: {},
  setIsLogin: (loginstate) => set(() => ({ isLogin: loginstate })),
}));

export default useIsLoginStore;
