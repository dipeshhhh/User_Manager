import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import './colors.css'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import PublicRoutes from './utils/PublicRoutes.jsx'

import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import UsersList from './pages/UsersList/UsersList.jsx'
import { UserListProvider } from './contexts/UserListContext.jsx'

// Using "*" as path for UsersList since currently this is the only page required.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />} >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />} >
          <Route path="*" element={
            <UserListProvider>
              <UsersList />
            </UserListProvider>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
