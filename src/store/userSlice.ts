import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  role: string;
  accessToken: string | null;
}

const initialState: IUser = {
  id: "",
  name: "",
  role: "",
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => {
      return {
        id: "",
        name: "",
        role: "",
        accessToken: null,
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
