import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import { saveToken } from "../../utils/auth";
import "./Login.css";

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
      console.log(response);
      saveToken(response.data.token, inputCredentials.rememberMe);
      // Show toast
      navigate("/");
    } catch (error) {
      console.error(error.response.data.error);
      // show toast instead
      setErrorMsg(`Error: ${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={inputCredentials.email}
          onChange={handleEmailInput}
          required
        />
        <input
          type="checkbox"
          value={showPassword}
          onChange={toggleShowPassword}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={inputCredentials.password}
          onChange={handlePasswordInput}
          required
        />

        <input
          type="checkbox"
          checked={inputCredentials.rememberMe}
          onChange={handleRememberMeInput}
        />
        <span>{errorMsg}</span>
        <button type="submit" onClick={handleSubmit}>{isLoading ? "Loading..." : "Sign In"}</button>
      </form>
    </>
  )
}