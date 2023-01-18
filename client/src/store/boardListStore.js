import { create } from "zustand";

const boardListStore = create((set) => ({
  boardList: [],

  getBoardListData(data) {
    set((state) => ({
      boardList: [...data],
    }));
  },
}));

export default boardListStore;
