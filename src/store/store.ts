import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import pegawaiDetailReducer from "./pegawaiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pegawaiId: pegawaiDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store as reduxStore };
