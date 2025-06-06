import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Chapter {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: { [year: string]: number };
  questionSolved: number;
  status: string;
  isWeakChapter: boolean;
}

interface ChaptersState {
  chapters: Chapter[];
  filteredChapters: Chapter[];
  activeSubject: string;
  sortDirection: "asc" | "desc";
  filters: {
    class: string;
    unit: string;
    notStarted: boolean;
    weakChapters: boolean;
  };
}

const initialState: ChaptersState = {
  chapters: [],
  filteredChapters: [],
  activeSubject: "Physics",
  sortDirection: "asc",
  filters: {
    class: "",
    unit: "",
    notStarted: false,
    weakChapters: false,
  },
};

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    loadChapters: (state, action: PayloadAction<Chapter[]>) => {
      state.chapters = action.payload;
      chaptersSlice.caseReducers.applyFilters(state);
    },
    setActiveSubject: (state, action: PayloadAction<string>) => {
      state.activeSubject = action.payload;
      chaptersSlice.caseReducers.applyFilters(state);
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<typeof initialState.filters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      chaptersSlice.caseReducers.applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      chaptersSlice.caseReducers.applyFilters(state);
    },
    sortChapters: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
      chaptersSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      let filtered = state.chapters.filter(
        (chapter) => chapter.subject === state.activeSubject
      );

      // Only apply class filter if it exists and is not "all"
      if (state.filters.class && state.filters.class !== "all") {
        filtered = filtered.filter(
          (chapter) => chapter.class === state.filters.class
        );
      }

      // Only apply unit filter if it exists and is not "all"
      if (state.filters.unit && state.filters.unit !== "all") {
        filtered = filtered.filter(
          (chapter) => chapter.unit === state.filters.unit
        );
      }

      if (state.filters.notStarted) {
        filtered = filtered.filter(
          (chapter) => chapter.status === "Not Started"
        );
      }

      if (state.filters.weakChapters) {
        filtered = filtered.filter((chapter) => chapter.isWeakChapter);
      }

      // Apply sorting
      filtered = filtered.sort((a, b) => {
        if (state.sortDirection === "asc") {
          return a.chapter.localeCompare(b.chapter);
        } else {
          return b.chapter.localeCompare(a.chapter);
        }
      });

      state.filteredChapters = filtered;
    },
  },
});

export const {
  loadChapters,
  setActiveSubject,
  setFilters,
  clearFilters,
  sortChapters,
} = chaptersSlice.actions;
export default chaptersSlice.reducer;
