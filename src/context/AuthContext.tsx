// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, } from 'react';
import { LoginData, LoginResponse } from '../interfaces/auth.interface';
import { useLoginQuery } from '../api/queries/auth/useLoginQuery';
import { useGetMeQuery } from '../api/queries/user/useGetMeQuery';
import {GetMeResponse} from "../interfaces/user.interface.ts";

interface AuthContextType {
  isLoggedIn: boolean | null;
  login: (loginData: LoginData) => Promise<LoginResponse>;
  logout: () => void;
  user:GetMeResponse | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { mutateAsync } = useLoginQuery();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const user = useGetMeQuery({setIsLoggedIn}).data;

   

  const login = async (loginData: LoginData) => {
    const res = await mutateAsync(loginData);
    if (res.token) {
      localStorage.setItem('token', res.token);
      setIsLoggedIn(true);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
