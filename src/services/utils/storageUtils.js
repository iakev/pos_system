export const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("userData");
  return storedUser ? JSON.parse(storedUser) : null;
}

export const loadTokenFromStorage = (tokenName) => {
  return localStorage.getItem(tokenName);
}

export const persistUserToStorage = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
}

export const persistTokenToStorage = (tokenName, token) => {
  localStorage.setItem(tokenName, token);
}

export const clearUserFromStorage = () => {
  localStorage.removeItem("userData");
}

export const clearTokenFromStorage = (tokenName) => {
  localStorage.removeItem(tokenName);
}
