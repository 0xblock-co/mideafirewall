import React, { createContext, useContext, useEffect, useState } from "react";

import { localStorageKeys } from "@/utils/constants";
import { readCookie } from "@/utils/cookieCreator";
import { createCookie } from "@/utils/cookieCreator";
import { eraseCookie } from "@/utils/cookieCreator";
import { decodeData, encodeData } from "@/utils/globalFunctions";

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = readCookie(localStorageKeys.authKey);
      if (token) {
        const user = decodeData(token, localStorageKeys.authKey);
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (user) => {
    if (user) {
      const token = encodeData(user, localStorageKeys.authKey);
      createCookie(localStorageKeys.authKey, token, 5);
      setUser(user);
    }
  };

  const logout = () => {
    eraseCookie(localStorageKeys.authKey);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
