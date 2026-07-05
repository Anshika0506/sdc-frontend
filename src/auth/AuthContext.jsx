import React, { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  clearAuthData,
  getAdminData,
  storeAuthData,
} from "../utils/cookieAuth";
import { loginAdmin, verifyToken, logoutAdmin } from "../api/Admin/login";

const AuthContext = createContext();
const SESSION_TOKEN = "session";

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

  const setSession = (adminData) => {
    storeAuthData(adminData, SESSION_TOKEN);
    localStorage.setItem("token", SESSION_TOKEN);
    setIsLoggedIn(true);
    setUser(adminData);
  };

  const clearSession = () => {
    clearAuthData();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const checkAuthStatus = async () => {
    try {
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        setUser(getAdminData());
        return;
      }

      const result = await verifyToken();
      if (result?.status !== false) {
        const adminData = result?.data || getAdminData();
        if (adminData) {
          setSession(adminData);
        }
      }
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginAdmin(email, password);
      const adminData = response?.data;

      if (!adminData) {
        throw new Error("Login failed. No user data returned.");
      }

      setSession(adminData);
      return adminData;
    } catch (error) {
      clearSession();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearSession();
    }
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
