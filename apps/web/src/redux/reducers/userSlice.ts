import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    email: string;
    isAuth: boolean;
  };
}

const initialState: UserState = {
  value: { email: "", isAuth: false },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      /* state.value += action.payload; */
    },
    handleSignIn: (state, action) => {
      state.value = action.payload;
    },
    handleUserUnauthorized: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleSignIn, handleUserUnauthorized } = userSlice.actions;

export default userSlice.reducer;
