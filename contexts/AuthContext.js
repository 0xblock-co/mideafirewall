import { createContext, useContext, useEffect, useState } from "react";

import { localStorageKeys } from "@/constants/global.constants";
import { createCookie, eraseCookie, readCookie } from "@/utils/cookieCreator";
import { decodeData, encodeData } from "@/utils/globalFunctions";

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allFeatures, setAllFeatures] = useState([]);

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

  const setAllFeatureList = (featureList) => {
    setAllFeatures(featureList);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!user,
        user,
        login,
        loading,
        logout,
        setAllFeatureList,
        allFeatures,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
