import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const readToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    return null;
  }
};

const writeToken = (token) => {
  try {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  } catch (e) {
    // ignore
  }
};

const decodeJwt = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(readToken());
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    writeToken(token);
    if (token) {
      const payload = decodeJwt(token);
      setUserName(payload?.username || payload?.userName || null);
    } else {
      setUserName(null);
    }
  }, [token]);

  const login = async (username, password) => {
    const response = await fetch(`/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.message || "Login failed");
    }

    const bearer = json?.token || "";
    const clean = bearer.startsWith("Bearer ") ? bearer.substring(7) : bearer;
    setToken(clean);
  };

  const signup = async (username, password) => {
    const response = await fetch(`/api/users?action=register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.message || "Signup failed");
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
