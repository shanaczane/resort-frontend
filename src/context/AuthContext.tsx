import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "guest" | "operator";
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>; // Added for signup
  guestLogin: (roomNumber: string, fullName: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => localStorage.removeItem("jwtToken"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(userData);
      setIsAuthenticated(true);
      navigate(
        userData.role === "operator" ? "/operator-dashboard" : "/guest-portal"
      );
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
        fullName,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/book"); // Redirect to booking after signup
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const guestLogin = async (roomNumber: string, fullName: string) => {
    try {
      const response = await axios.post("/api/auth/guest-login", {
        roomNumber,
        fullName,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/guest-portal");
    } catch (error) {
      console.error("Guest login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, guestLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (undefined === context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
