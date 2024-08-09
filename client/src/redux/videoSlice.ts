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
      if (state.currentVideo) {
        if (!state.currentVideo.likes.includes(action.payload)) {
          state.currentVideo.likes.push(action.payload);
          const dislikeIndex = state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          );
          if (dislikeIndex !== -1) {
            state.currentVideo.dislikes.splice(dislikeIndex, 1);
          }
        }
      }
    },
    dislike: (state, action: PayloadAction<string>) => {
      if (state.currentVideo) {
        if (!state.currentVideo.dislikes.includes(action.payload)) {
          state.currentVideo.dislikes.push(action.payload);
          const likeIndex = state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          );
          if (likeIndex !== -1) {
            state.currentVideo.likes.splice(likeIndex, 1);
          }
        }
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;
