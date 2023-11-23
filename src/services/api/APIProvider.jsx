import React, { useEffect, useState } from "react";

import APIContext from "./APIContext";

const APIProvider = function APIProviderComponent({ children }) {
  // store authentiaction Token
  const [accessToken, setAccessToken] = useState(null);
  // store current authenticated User
  const [user, setUser] = useState(null);

  const context = { accessToken, setAccessToken, user, setUser };

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) {
        setUser(null);
      }
    }
    updateUser();
  }, [accessToken]);

  return (
    <APIContext.Provider value={context}>{children}</APIContext.Provider>
  );
}

export default APIProvider;