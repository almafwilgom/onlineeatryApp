/**
 * AuthContext.jsx — manages authentication state across the entire app.
 *
 * Provides:
 *  - user         : the current logged-in user object (or null)
 *  - token        : the JWT string (or null)
 *  - isAuthenticated : boolean shorthand
 *  - loading      : true while restoring session from localStorage on mount
 *  - login(token, user) : persist and set auth state
 *  - logout()     : clear auth state
 *
 * Full implementation in Phase 7.
 */
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser  = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token,
      loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenient access
export const useAuth = () => useContext(AuthContext);
