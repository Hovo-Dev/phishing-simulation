import { RootState } from "types";

const authSystem = (state: RootState) => state.auth;
const userProfile = (state: RootState) => state.auth.userProfile;
const authLogout = (state: RootState) => state.auth.logout;

export const AuthSelectors = {
  authSystem,
  userProfile,
  authLogout,
};
