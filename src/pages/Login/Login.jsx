import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import { saveToken } from "../../utils/auth";
import "./Login.css";
import "../pages.css";

import Visibility from "../../assets/visibility.svg";
import VisibilityOff from "../../assets/visibility_off.svg";

export default function Login() {
  const [inputCredentials, setInputCredentials] = useState({
    "email": "",
    "password": "",
    "rememberMe": false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // ========== Input Validation ==========
  const validateInputs = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputCredentials.email && !inputCredentials.password) {
      setErrorMsg("Missing email and Password");
      return false;
    }
    if (!inputCredentials.email) {
      setErrorMsg("Missing email");
      return false;
    } else if (!emailRegex.test(inputCredentials.email)) {
      setErrorMsg("Invalid email");
      return false;
    }
    if (!inputCredentials.password) {
      setErrorMsg("Missing Password");
      return false;
    }

    setErrorMsg('');
    return true;
  }

  // ========== Form Handles ==========
  const handleEmailInput = (e) => {
    setInputCredentials({ ...inputCredentials, email: e.target.value });
  }
  const handlePasswordInput = (e) => {
    setInputCredentials({ ...inputCredentials, password: e.target.value });
  }
  const handleRememberMeInput = (e) => {
    setInputCredentials({ ...inputCredentials, rememberMe: !inputCredentials.rememberMe });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateInputs()) return;
    handleLogin();
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { "email": inputCredentials.email, "password": inputCredentials.password },
        { headers: { "Content-Type": "application/json" } }
      );

      saveToken(response.data.token, inputCredentials.rememberMe);
      // Show toast
      navigate("/");
    } catch (error) {
      console.error(error.response.data.error);
      // show toast instead
      setErrorMsg(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page-main login-page">
      <h4>Log In</h4>
      <form className="login-form">
        <div className="form-input-container">
          <label htmlFor="login-input-email">Email</label>
          <span className="form-input-section">
            <input
              id="login-input-email"
              className="form-input"
              type="email"
              placeholder="Email"
              value={inputCredentials.email}
              onChange={handleEmailInput}
              required
            />
          </span>
        </div>
        <div className="form-input-container">
          <label htmlFor="login-input-password">Password</label>
          <span className="form-input-section">
            <input
              id="login-input-password"
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={inputCredentials.password}
              onChange={handlePasswordInput}
              required
            />
            <img
              className="interactive-icon input-icon-right"
              src={showPassword ? Visibility : VisibilityOff}
              onClick={toggleShowPassword}
            />
          </span>
        </div>
        {errorMsg && // Will use toast later, this will do for now
          <span className="error-message">Error: {errorMsg}</span>
        }
        <div className="form-input-container">
          <span className="form-checkbox-container">
            <input
              id="input-stay-logged-in"
              type="checkbox"
              className="form-checkbox"
              checked={inputCredentials.rememberMe}
              onChange={handleRememberMeInput}
            />
            <label htmlFor="input-stay-logged-in">Stay logged in?</label>
          </span>
          <button
            className="button"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ?
              "Loading..."
              :
              "Log In"
            }
          </button>
        </div>
      </form>
    </main>
  )
}