import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiSliceType = {
  loading: {
    show: boolean;
    text: string;
  };
};
const initialState: UiSliceType = {
  loading: {
    show: false,
    text: "",
  },
};
const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string>) => {
      state.loading = { show: true, text: action.payload };
    },
    hideLoading: (state) => {
      state.loading = { show: false, text: "" };
    },
  },
});

export const { showLoading, hideLoading } = uiSlice.actions;
export default uiSlice.reducer;
