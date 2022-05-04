import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  isSignedIn: false,
  token: null,
  userId: null,
  signin: () => { },
  signout: () => { },
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const signin = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    console.log('Signed In!');
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setUserId(null);
    console.log('Signed Out!');
  }, []);

  const context = {
    isSignedIn: !!token,
    token,
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