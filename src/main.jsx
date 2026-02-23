import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import Login from './app/Login'
import Register from './app/Register'
import ForgotPassword from './app/ForgotPassword'
import { createBrowserRouter } from 'react-router'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
])

const root = createRoot(document.getElementById('root'))

root.render(
  <RouterProvider router={router} />
)
