import axios from "axios";
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
  const { accessToken } = context;
  const url = `${route}`;

  const augmentedHeaders = {
    Authorization: accessToken ? `Token ${accessToken}` : undefined,
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
    let apiError = { message: "An unknown error in hitting REST API" };
    throw apiError;
  }
  return response.data;
};

export default makeRequest;