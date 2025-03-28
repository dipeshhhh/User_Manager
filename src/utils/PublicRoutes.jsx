import { Navigate, Outlet } from "react-router";
import { getToken } from "./auth";

export default function PublicRoutes() { // Only for loggedOut/guest users
  const user = getToken();
  return user ? <Navigate to="/" /> : <Outlet />;
}