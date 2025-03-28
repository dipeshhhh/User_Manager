import { Navigate, Outlet } from "react-router";
import { getToken } from "./auth";

export default function ProtectedRoutes() { // only for loggedIn users
  const user = getToken();
  return user ? <Outlet /> : <Navigate to="/login" />;
}