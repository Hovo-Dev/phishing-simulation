import { createSlice } from "@reduxjs/toolkit";

import { clearSignIn, signIn, userProfile } from "./actions";

export type TAuthState = {
  signIn: {
    data: {
      data: {
        email: string | null;
        fullName: string | null;
        id: string | null;
      };
      access_token: string | null;
    } | null;
    loading: boolean;
    error: string | null;
  };
  userProfile: {
    data: {
      email: string | null;
      fullName: string | null;
      id: string | null;
    } | null;
    loading: boolean;
    error: string | null;
  };
};

export const initialState: TAuthState = {
  signIn: {
    data:
      {
        data: {
          email: null,
          fullName: null,
          id: null,
        },
        access_token: null,
      } || null,
    loading: false,
    error: null,
  },
  userProfile: {
    data: null,
    loading: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.signIn.loading = true;
      state.signIn.error = null;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.signIn.loading = false;
      state.signIn.error = null;
      state.signIn.data = payload;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.signIn.loading = false;
      state.signIn.error = action.payload as null;
    });
    builder.addCase(clearSignIn.fulfilled, (state) => {
      state.signIn.loading = false;
      state.signIn.error = null;
      state.signIn.data = null;
    });

    builder.addCase(userProfile.pending, (state) => {
      state.userProfile.loading = true;
      state.userProfile.error = null;
    });

    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.userProfile.loading = false;
      state.userProfile.error = null;
      state.userProfile.data = payload as any;
    });

    builder.addCase(userProfile.rejected, (state, action) => {
      state.userProfile.loading = false;
      state.userProfile.error = action.payload as null;
    });
  },
});

export const { name, actions } = authSlice;

const authReducer = authSlice.reducer;

export default authReducer;
