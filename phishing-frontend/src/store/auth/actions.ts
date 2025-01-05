import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCookie } from "libraries/cookie";
import axiosInstance from "libraries/axios";

export type TSignInData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  fullName: string;
  email: string;
  password: string;
};

export const clearSignIn = createAsyncThunk("clear/google/sign-in/data", () => {
  return null;
});

export const signIn = createAsyncThunk(
  "auth/login",
  async (body: TSignInData, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post("/auth/login", body)) as any;

      setCookie("token", data.access_token);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async (body: TRegisterData, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post("/auth/signup", body)) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/profile/data",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user/profile");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
