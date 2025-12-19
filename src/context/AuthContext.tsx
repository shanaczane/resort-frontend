import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

// TypeScript interfaces
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
  logout: () => void;
  guestLogin: (roomNumber: string, fullName: string) => Promise<void>; // For post-check-in guest portal
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

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Validate token via API (e.g., fetch user profile)
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("jwtToken");
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(userData);
      setIsAuthenticated(true);
      // Redirect based on role
      if (userData.role === "operator") {
        navigate("/operator-dashboard");
      } else {
        navigate("/guest-portal");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      value={{ user, isAuthenticated, login, logout, guestLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (undefined === context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
