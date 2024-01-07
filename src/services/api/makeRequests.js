import axios from "axios";
import { silentRefresh } from "./auth/authenticate";
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';
const defaultHeaders = {
  "Content-Type": "application/json",
};

const makeRequest = async function makeAPIRequest(
  context,
  route,
  {
    data = undefined,
    headers = {},
    method = "GET",
    timeout = 10000,
  }
) {
  const { accessToken, refreshToken } = context;
  const url = `${route}`;

  const augmentedHeaders = {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...defaultHeaders,
    ...headers,
  }

  const options = {
    data,
    headers: augmentedHeaders,
    method,
    url,
    timeout,
  };
  let response;
  try {
    response = await axios(options);
  } catch (error) {
    if (axios.isCancel(error)) {
      let timeoutError = { message: "Request timed out. Server may be offline." };
      throw timeoutError;
    }
    if (error.response && error.response.status === 401) {
      const isTokenExpired = () => {
        if (!accessToken) {
          // No access token available
          return true;
        }

        try {
          const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
          const expirationTime = tokenData.exp * 1000; // convert to milliseconds
          return expirationTime < Date.now();
        } catch (decodeError) {
          console.error("Error decoding token: ", decodeError);
          return true;
        }
      };

      if (isTokenExpired() && refreshToken) {
        try {
          return await refreshTokenandRetry(context, refreshToken, options);
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
          throw error;
        }
      } else {
        // clear all tokens and redirect to login
        context.clearTokens();
        window.location.replace('/login');
      }
    }
    let apiError = { message: "An unknown error in hitting REST API" };
    throw apiError;
  }
  return response.data;
};

const refreshTokenandRetry = async (context, refreshToken, options) => {
  try {
    const newAccessToken = await silentRefresh(context, refreshToken);
    const updatedOptions = {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${newAccessToken}` }
    };
    const retryResponse = await axios(updatedOptions);
    return retryResponse.data;
  } catch (refreshError) {
    console.log("refreshError is: ", refreshError);
    toast.error(refreshError.message, { autoClose: 5000 });
    throw refreshError;
  }
};

export default makeRequest;