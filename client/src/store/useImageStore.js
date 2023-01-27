import { create } from "zustand";

const useImageStore = create((set) => ({
  imageStoreData: [],

  setImageStoreData(data) {
    set((state) => ({
      imageStoreData: [data],
    }));
  },
}));

export default useImageStore;
