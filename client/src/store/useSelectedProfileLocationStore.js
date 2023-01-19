import { create } from "zustand";

const useSelectedProfileLocationStore = create((set) => ({
  location: "없음",
  setLocation: (clickedLocation) => set(() => ({ location: clickedLocation })),
}));

export default useSelectedProfileLocationStore;
