import makeRequest from "../makeRequests";
import { toast } from "react-toastify";

const authenticate = async function authenticateService(context, { username, password }) {
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
  const accessToken = response.token;
  const user = response.user;
  context.setAccessToken(accessToken);
  context.setUser(user);
  return null;
};

export default authenticate;