import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  token: null,
  user: null,
  signin: () => { },
  signout: () => { },
});