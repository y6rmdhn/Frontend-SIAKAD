import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PegawaiDetailState {
  pegawaiId: string | number | null;
}

const initialState: PegawaiDetailState = {
  pegawaiId: null,
};

const pegawaiDetailSlice = createSlice({
  name: "pegawaiDetail",
  initialState,
  reducers: {
    setPegawaiId: (state, action: PayloadAction<string | number>) => {
      state.pegawaiId = action.payload;
    },
  },
});

export const { setPegawaiId } = pegawaiDetailSlice.actions;

export default pegawaiDetailSlice.reducer;
