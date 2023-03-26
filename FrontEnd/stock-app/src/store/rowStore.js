import { createSlice } from "@reduxjs/toolkit";

export const rowSlice = createSlice({
  name: "row",
  initialState: {
    selectedRow: { test: "test" },
  },
  reducers: {
    selectRow: (state, action) => {
      state.selectedRow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectRow } = rowSlice.actions;

export default rowSlice.reducer;
