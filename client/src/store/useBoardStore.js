import { create } from "zustand";

const useBoardStore = create((set) => ({
  boardData: {},
  answerListData: [],

  setBoardData(data) {
    set((state) => ({
      board: { ...data },
    }));
  },
  setAnswerListData(data) {
    set((state) => ({
      answerListData: [...data],
    }));
  },
}));

export default useBoardStore;
