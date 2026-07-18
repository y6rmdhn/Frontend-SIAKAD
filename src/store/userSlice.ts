import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  nama: string;
  nip: string;
  nidn: string;
  pegawai_id: string;
  role: string;
  role_id: number;
  permissions: string[];
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IUser = {
  id: "",
  nama: "",
  nip: "",
  nidn: "",
  pegawai_id: "",
  role: "",
  role_id: 0,
  permissions: [],
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
        nama: "",
        nip: "",
        nidn: "",
        pegawai_id: "",
        role: "",
        role_id: 0,
        permissions: [],
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { setUserData, setAccessToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;
