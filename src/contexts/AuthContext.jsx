import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Simulating an active session by default for development speed. 
  // Normally this would be null until explicit login.
  const [user, setUser] = useState({
    id: 'EMP042',
    name: 'Rohit Sharma',
    role: 'admin', // roles: 'admin' | 'hr' | 'employee'
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role: user?.role, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
