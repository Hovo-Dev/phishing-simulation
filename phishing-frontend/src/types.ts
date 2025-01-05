import { FC, SVGProps } from "react";
import { Action, ThunkAction } from "@reduxjs/toolkit";

import { store } from "libraries/redux";

export type TSVG = FC<SVGProps<SVGSVGElement>>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
