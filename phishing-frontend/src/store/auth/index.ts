import { createSlice } from "@reduxjs/toolkit";
import {clearSignIn, logout, signIn, signUp, userProfile} from "./actions";

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
  },
  logout: {
    data: null,
    loading: boolean,
    errors: any[] | null,
  },
  signUp: {
    data: null,
    loading: boolean,
    errors: any[] | null,
  },
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
    data: {
        data: {
          email: null,
          fullName: null,
          id: null,
        },
        access_token: null,
    },
    loading: false,
    error: null,
  },
  logout: {
    data: null,
    loading: false,
    errors: null,
  },
  signUp: {
    data: null,
    loading: false,
    errors: null,
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

    builder.addCase(logout.pending, (state) => {
      state.logout.loading = true;
      state.logout.errors = null;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.logout.loading = false;
      state.logout.errors = null;
      state.logout.data = payload;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logout.loading = false;
      state.logout.errors = (action.payload as any).errors as null;
    });

    builder.addCase(signUp.pending, (state) => {
      state.signUp.loading = true;
      state.signUp.errors = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.signUp.loading = false;
      state.signUp.errors = null;
      state.signUp.data = payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.signUp.loading = false;
      state.signUp.errors = (action.payload as any).errors as null;
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
