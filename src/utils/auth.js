// Save token to localStorage or sessionStorage
export const saveToken = (token, rememberMe = false) => {
  if (rememberMe) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
};

// Retrieve token from storage
export const getToken = () => {
  return sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
};

// Remove token (for logout)
export const removeToken = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
};