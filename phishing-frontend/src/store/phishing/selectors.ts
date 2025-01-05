import { RootState } from "types";

const phishing = (state: RootState) => state.phishing;

export const PhishingSelectors = {
  phishing,
};
