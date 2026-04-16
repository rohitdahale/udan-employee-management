import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const resp = await api.getCurrentUser();
          setUser(resp.user);
        } catch (error) {
          console.error("Session invalid or expired", error);
          localStorage.removeItem('token');
        }
      }
      setIsSessionLoading(false);
    };
    initSession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role: user?.role, isAuthenticated: !!user, isSessionLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
