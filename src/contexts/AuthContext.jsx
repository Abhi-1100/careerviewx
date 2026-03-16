import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, getCurrentUser, saveUserData, clearUserData } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const t = getToken();
    const u = getCurrentUser();
    if (t && u) {
      setToken(t);
      setUser(u);
    }
    setLoading(false);
  }, []);

  const login = (t, u) => {
    // persist and update state
    saveUserData(t, u);
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    clearUserData();
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
