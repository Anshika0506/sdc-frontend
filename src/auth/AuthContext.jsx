import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, clearAuthData, getAdminData } from "../utils/cookieAuth";
import { loginAdmin } from "../api/Admin/login";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ AUTH CHECK ON LOAD
  const checkAuthStatus = () => {
    try {
      const hasAuth = isAuthenticated();

      if (!hasAuth) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      const adminData = getAdminData();

      setIsLoggedIn(true);
      setUser(adminData || { authenticated: true });
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const userData = await loginAdmin(email, password);

      setIsLoggedIn(true);
      setUser(userData);

      return userData;
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loading,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};