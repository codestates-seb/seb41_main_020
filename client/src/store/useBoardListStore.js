import { create } from "zustand";

const useBoardListStore = create((set) => ({
  boardList: [],

  getBoardListData(data) {
    set((state) => ({
      boardList: [...data],
    }));
  },
}));

export default useBoardListStore;
