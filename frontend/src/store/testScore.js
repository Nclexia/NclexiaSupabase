import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTestStore = create(
  persist(
    (set) => ({
      subjects: [],
      systems: [],
      type:[],
      numQuestions: 0,

      setTestData: ({ subjects, systems, numQuestions,type }) =>
        set({ subjects, systems, numQuestions,type }),

      resetTestData: () => set({ subjects: [], systems: [], numQuestions: 0, type:[] }),
    }),
    {
      name: 'lms-test', // key in localStorage
    }
  )
);

export default useTestStore;
