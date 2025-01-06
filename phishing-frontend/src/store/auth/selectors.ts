import { RootState } from "types";

const authSystem = (state: RootState) => state.auth;
const userProfile = (state: RootState) => state.auth.userProfile;
const authLogout = (state: RootState) => state.auth.logout;
const authSignIn = (state: RootState) => state.auth.signIn;
const authSignUp = (state: RootState) => state.auth.signUp;

export const AuthSelectors = {
  authSystem,
  userProfile,
  authLogout,
  authSignIn,
  authSignUp
};
