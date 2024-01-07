import React, { useEffect, useState } from "react";
import {
  loadTokenFromStorage,
  loadUserFromStorage,
  clearTokenFromStorage,
  clearUserFromStorage
} from "../utils/storageUtils";
import APIContext from "./APIContext";

const APIProvider = function APIProviderComponent({ children }) {
  // store authentiaction Token
  const [accessToken, setAccessToken] = useState(loadTokenFromStorage("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(loadTokenFromStorage("refreshToken") || null);
  // store current authenticated User
  const [user, setUser] = useState(loadUserFromStorage());

  const context = { accessToken, setAccessToken, user, setUser, refreshToken, setRefreshToken, clearTokens };

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) {
        setUser(null);
      }
    }
    updateUser();
  }, [accessToken]);

  function clearTokens() {
    setAccessToken(null);
    setRefreshToken(null);
    clearTokenFromStorage("accessToken");
    clearTokenFromStorage("refreshToken");
    clearUserFromStorage();
  }


  return (
    <APIContext.Provider value={context}>{children}</APIContext.Provider>
  );
}

export default APIProvider;