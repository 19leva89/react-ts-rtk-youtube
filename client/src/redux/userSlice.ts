import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../types";

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        const index = state.currentUser.subscribedUsers.findIndex(
          (channelId) => channelId === action.payload
        );
        if (index !== -1) {
          state.currentUser.subscribedUsers.splice(index, 1);
        } else {
          state.currentUser.subscribedUsers.push(action.payload);
        }
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;

export default userSlice.reducer;
