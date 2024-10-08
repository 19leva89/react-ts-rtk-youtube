import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, VideoState } from "../types";

const initialState: VideoState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<Video>) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action: PayloadAction<string>) => {
      if (!state.currentVideo?.likes?.includes(action.payload)) {
        state.currentVideo?.likes?.push(action.payload);
        state.currentVideo?.dislikes?.splice(
          state.currentVideo.dislikes.findIndex((userId) => userId === action.payload),
          1
        );
      }
    },
    dislike: (state, action: PayloadAction<string>) => {
      if (!state.currentVideo?.dislikes?.includes(action.payload)) {
        state.currentVideo?.dislikes?.push(action.payload);
        state.currentVideo?.likes?.splice(
          state.currentVideo.likes.findIndex((userId) => userId === action.payload),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;
