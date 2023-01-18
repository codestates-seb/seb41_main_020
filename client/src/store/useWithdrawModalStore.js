import { create } from "zustand";

const useWithdrawModalStore = create((set) => ({
  openModal: false,
  setOpenModal: () => set((state) => ({ openModal: !state.openModal })),
}));

export default useWithdrawModalStore;
