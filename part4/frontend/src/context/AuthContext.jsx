import { createContext, useState, useEffect } from 'react';
import { setAuthCookie, eraseCookie, getCookie } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('token');
    if (token) setUser({ token });
  }, []);

  const login = (token, stayLoggedIn) => {
    setAuthCookie(token, stayLoggedIn);
    setUser({ token });
  };

  const logout = () => {
    eraseCookie('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
