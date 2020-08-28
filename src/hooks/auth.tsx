import React, { createContext, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { decode } from 'jsonwebtoken';
import api from '../services/api';

interface User {
  id: string;
  name: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Vaggo:token');
    const user = localStorage.getItem('@Vaggo:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('authenticate', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Vaggo:token', token);
    localStorage.setItem('@Vaggo:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Vaggo:token');
    localStorage.removeItem('@Vaggo:user');

    setData({} as AuthState);
  }, []);

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@Vaggo:token');
    const user = localStorage.getItem('@Vaggo:user');
    if (token && user) {
      const decodeToken = decode(token) as { exp: number };

      if (!decodeToken) {
        signOut();
        throw new axios.Cancel('expired-token');
      }

      const tokenDate = new Date(decodeToken.exp * 1000);
      const isExpired = tokenDate <= new Date();
      if (isExpired) {
        signOut();
        throw new axios.Cancel('expired-token');
      }
    }

    return config;
  });

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
