import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const homePageSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchDatas(state, action) {
      state.data = action.payload;

      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload;

      state.totalPages = action.payload.totalPages;
      state.error = null;
    },
    fetchDataError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { fetchDatas, fetchDataSuccess, fetchDataError } =
  homePageSlice.actions;
export default homePageSlice.reducer;
