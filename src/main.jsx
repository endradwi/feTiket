import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './shared/styles/globals.css'
import { createBrowserRouter } from 'react-router'
import Home from './app/main/home'
import Login from './app/auth/Login'
import Register from './app/auth/Register'
import ForgotPassword from './app/auth/ForgotPassword'
import Movie from './app/main/movies'
import MovieDetail from './app/main/MovieDetail'
import Order from './app/main/Order'
import Payment from './app/main/Payment'
import Profile from './app/main/Profile'
import Ticket from './app/main/Ticket'
import AdminDashboard from './app/main/AdminDashboard'
import AdminMovies from './app/main/AdminMovies'
import { Provider } from 'react-redux'
import { store } from './store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
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
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/ticket",
    element: <Ticket />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/movies",
    element: <AdminMovies />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
