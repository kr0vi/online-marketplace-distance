"use client"
import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../api";

type AuthContextValue = {
  user: { id: number; email: string; name: string } | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded: !loading,
        isSignedIn: !!user,
        refresh: loadUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
