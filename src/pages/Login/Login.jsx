import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import { saveToken } from "../../utils/auth";
import "./Login.css";
import "../pages.css";

import Visibility from "../../assets/visibility.svg";
import VisibilityOff from "../../assets/visibility_off.svg";
import { validateEmail } from "../../utils/helpers";
import FormTextInput from "../../components/FormInputs/FormTextInput/FormTextInput";
import FormCheckboxInput from "../../components/FormInputs/FormCheckboxInput/FormCheckboxInput";

export default function Login() {
  const [inputCredentials, setInputCredentials] = useState({
    "email": "",
    "password": "",
    "rememberMe": false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // ========== Input Validation ==========
  const validateInputs = () => {
    if (!inputCredentials.email && !inputCredentials.password) {
      setErrorMessage("Missing email and Password");
      return false;
    }
    if (!inputCredentials.email) {
      setErrorMessage("Missing email");
      return false;
    } else if (!validateEmail(inputCredentials.email)) {
      setErrorMessage("Invalid email");
      return false;
    }
    if (!inputCredentials.password) {
      setErrorMessage("Missing Password");
      return false;
    }

    setErrorMessage('');
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
      setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-body login-page">
      <h4>Log In</h4>
      <form className="login-form" onSubmit={handleSubmit}>
        <FormTextInput
          autoFocus
          id="login-input-email"
          inputName="Email"
          inputType="email"
          inputValue={inputCredentials.email}
          handleInput={handleEmailInput}
          required={true}
        />
        <FormTextInput
          id="login-input-password"
          inputName="Password"
          inputType={showPassword ? "text" : "password"}
          inputValue={inputCredentials.password}
          handleInput={handlePasswordInput}
          required={true}
        >
          <img
            className="interactive-icon password-visibility-icon"
            src={showPassword ? Visibility : VisibilityOff}
            onClick={toggleShowPassword}
          />
        </FormTextInput>
        {errorMessage && // Will use toast later, this will do for now
          <span className="error-message">Error: {errorMessage}</span>
        }
        <div className="form-input-container">
          <FormCheckboxInput
            id="input-stay-logged-in"
            checked={inputCredentials.rememberMe}
            onChange={handleRememberMeInput}
            inputName="Stay logged in?"
          />
          <button
            className="button primary"
            type="submit"
          >
            {isLoading ?
              "Loading..."
              :
              "Log In"
            }
          </button>
        </div>
      </form>
    </div>
  )
}