import { createSlice } from "@reduxjs/toolkit";

import { phishingAttempts, phishingPost } from "./actions";

export type TAuthState = {
  phishingPost: {
    phishing: string | null;
    loading: boolean;
    error: string | null;
  };
  phishingAttempts: {
    phishingList: Array<{
      id: string;
      email: string;
      status: string;
      content: string;
    }> | null;
    loading: boolean;
    error: string | null;
  };
};

export const initialState: TAuthState = {
  phishingPost: {
    phishing: null,
    loading: false,
    error: null,
  },
  phishingAttempts: {
    phishingList: null,
    loading: false,
    error: null,
  },
};

const phishingSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(phishingPost.pending, (state) => {
      state.phishingPost.loading = true;
      state.phishingPost.error = null;
    });

    builder.addCase(phishingPost.fulfilled, (state, { payload }) => {
      state.phishingPost.loading = false;
      state.phishingPost.error = null;
      state.phishingPost.phishing = payload;
    });

    builder.addCase(phishingPost.rejected, (state, action) => {
      state.phishingPost.loading = false;
      state.phishingPost.error = action.payload as null;
    });

    builder.addCase(phishingAttempts.pending, (state) => {
      state.phishingAttempts.loading = true;
      state.phishingAttempts.error = null;
    });

    builder.addCase(phishingAttempts.fulfilled, (state, { payload }) => {
      state.phishingAttempts.loading = false;
      state.phishingAttempts.error = null;
      state.phishingAttempts.phishingList = payload;
    });

    builder.addCase(phishingAttempts.rejected, (state, action) => {
      state.phishingAttempts.loading = false;
      state.phishingAttempts.error = action.payload as null;
    });
  },
});

export const { name, actions } = phishingSlicer;

const authReducer = phishingSlicer.reducer;

export default authReducer;
