import React, { useState } from "react";
import { useAPI } from "../../services/api/useAPI";
import { authenticate } from "../../services/api/auth/authenticate";
import "./login.scss"

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const apiContext = useAPI();
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setLoginData(prevLoginData => {
      return {
        ...prevLoginData,
        [name]: type === "checkbox" ? checked : value,
      }
    });
  }

  function validateInputs({ username, password }) {
    if (!username) {
      return "Username cannot be empty";
    }
    if (password.length < 6) {
      return "Password should be a t least 6 characters";
    }
    return null;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const error = validateInputs(loginData);
    if (error) {
      alert(`Error:${error}`);
    } else {
      await authenticate(apiContext, loginData);
      window.location.replace('/');
    }

  }
  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="login-text">
          Log in to your account 🔐
        </h1>
        <form onSubmit={handleLogin} className="form">
          <div className="input-container">
            <input
              type="text"
              placeholder="username or email"
              onChange={handleChange}
              value={loginData.username}
              name="username"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              value={loginData.password}
              name="password"
            />
          </div>
          <br />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}