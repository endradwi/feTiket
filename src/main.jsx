import { StrictMode } from 'react'
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
import Profile from './app/Profile'
import Ticket from './app/Ticket'
import AdminDashboard from './app/AdminDashboard'
import AdminMovies from './app/AdminMovies'
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
