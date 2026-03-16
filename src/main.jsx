import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { createBrowserRouter } from 'react-router'
import Home from './app/Home'
import Login from './app/Login'
import Register from './app/Register'
import ForgotPassword from './app/ForgotPassword'
import Movie from './app/Movie'
import MovieDetail from './app/MovieDetail'
import Order from './app/Order'
import Payment from './app/Payment'
import Ticket from './app/Ticket'

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
])

const root = createRoot(document.getElementById('root'))

root.render(
  <RouterProvider router={router} />
)
