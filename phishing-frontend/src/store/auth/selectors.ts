import { RootState } from "types";

const authSystem = (state: RootState) => state.auth;
const userProfile = (state: RootState) => state.auth.userProfile;

export const AuthSelectors = {
  authSystem,
  userProfile,
};
