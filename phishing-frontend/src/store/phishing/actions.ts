import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "libraries/axios";
import { TPhishingProps } from "pages/Home";

export const phishingPost = createAsyncThunk(
  "phishing/post",
  async (body: TPhishingProps, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post(
        "/phishing/send",
        body
      )) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const phishingAttempts = createAsyncThunk(
  "phishing/attempts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.get("/phishing/attempts")) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
