import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!localStorage.getItem("token"));

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem("token");

    if (token) {
      API.get("/users/me")
        .then((res) => {
          if (isMounted) setUser(res.data);
        })
        .catch(() => {
          if (isMounted) localStorage.removeItem("token");
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, []); // ✅ No stray "} [];" here

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
} // ✅ AuthProvider closes here
