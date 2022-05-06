import { useCallback, useEffect, useState } from "react";

let signoutTimer;

export const useAuth = () => {
  const [tokenExpiration, setTokenExpiration] = useState();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const signin = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // current time + 1h (1000ms = 1sec, 60sec = 1min, 60min = 1h)
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token,
      expiration: tokenExpirationDate.toISOString()
    }));
    setUserId(uid);
    console.log('Signed In!');
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setUserId(null);
    localStorage.removeItem('userData');
    console.log('Signed Out!');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      signin(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [signin]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      signoutTimer = setTimeout(signout, remainingTime);
    } else {
      clearTimeout(signoutTimer);
    }
  }, [token, tokenExpiration, signout]);

  return { token, signin, signout, userId };
};