import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  isSignnedIn: false,
  userId: null,
  signin: () => { },
  signout: () => { },
});

export const AuthContextProvider = (props) => {
  const [isSignnedIn, setIsSignnedIn] = useState([]);
  const [userId, setUserId] = useState(null);

  const signin = useCallback((uid) => {
    setIsSignnedIn(true);
    setUserId(uid);
  }, []);

  const signout = useCallback(() => {
    setIsSignnedIn(false);
    setUserId(null);
  }, []);

  const context = {
    isSignnedIn,
    userId,
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