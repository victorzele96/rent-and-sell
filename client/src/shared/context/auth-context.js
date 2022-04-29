import { createContext, useState } from "react";

const AuthContext = createContext({
  isSignnedIn: false,
  signin: () => { },
  signout: () => { },
});

export const AuthContextProvider = (props) => {
  const [isSignnedIn, setIsSignnedIn] = useState([]);

  const signin = () => {
    setIsSignnedIn(true);
  };

  const signout = () => {
    setIsSignnedIn(false);
  };

  const context = {
    isSignnedIn,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;