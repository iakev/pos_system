import axios from "axios";
import makeRequest from "../makeRequests";
import { toast } from "react-toastify";
import { persistTokenToStorage, persistUserToStorage } from "../../utils/storageUtils";

export const authenticate = async function authenticateService(context, { username, password }) {
  // Question do I need to authenticate and I can get the info from login??
  const uri = "users/login/";
  const method = "POST";
  const data = { username, password };

  let response;
  try {
    response = await makeRequest(context, uri, { data, method });
  } catch (err) {
    const authError = { message: `There is a problem in authenticating: ${err}` };
    toast.error(authError, { autoClose: 5000 });
    throw authError;
  }
  const tokenObj = response.token || {};
  const accessToken = tokenObj.access;
  const refreshToken = tokenObj.refresh;
  context.setAccessToken(accessToken);
  context.setRefreshToken(refreshToken);
  persistTokenToStorage("accessToken", accessToken);
  persistTokenToStorage("refreshToken", refreshToken);
  const user = response.user;
  context.setUser(user);
  persistUserToStorage(user);
};

export const silentRefresh = async (context, refreshToken) => {
  const uri = "users/refresh_token/"
  const method = "POST";
  const data = { refresh: refreshToken };
  try {
    const response = await axios({
      method,
      url: uri,
      data,
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newAccessToken = response.data.access;
    context.setAccessToken(newAccessToken);
    persistTokenToStorage("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    const refreshError = { message: `Error during silent refresh: ${err}` };
    context.clearTokens();
    toast.error(refreshError, { autoClose: 5000 });
    throw refreshError;
  }
};




