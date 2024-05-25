import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  points: number;
}

const initialState = <User>{
  name: "",
  points: 0,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
