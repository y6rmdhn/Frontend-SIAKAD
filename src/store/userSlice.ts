import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  nip: string;
  pegawai_id: string;
  role: string;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IUser = {
  id: "",
  name: "",
  nip: "",
  pegawai_id: "",
  role: "",
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearUserData: () => {
      return {
        id: "",
        name: "",
        nip: "",
        pegawai_id: "",
        role: "",
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { setUserData, setAccessToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;
