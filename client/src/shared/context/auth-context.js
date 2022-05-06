import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  token: null,
  userId: null,
  signin: () => { },
  signout: () => { },
});