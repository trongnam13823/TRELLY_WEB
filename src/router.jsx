import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthForm from './layouts/AuthForm'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { SendVerifyEmail } from './pages/auth/SendVerifyEmail'
import VerifyEmail from './pages/auth/VerifyEmail'
import { SendResetPassword } from './pages/auth/SendResetPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Verify2FA } from './pages/auth/Verify2FA'
import Root from './layouts/Root'
import Boards from './pages/Boards/Boards'
import Authenticated from './layouts/Authenticated'
import Unauthenticated from './layouts/Unauthenticated'
import Profile from './pages/Profile/Profile'
import BoardDetail from './pages/BoardDetail/BoardDetail'
import App from './App'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Unauthenticated />,
        children: [
          {
            element: <AuthForm />,
            children: [
              {
                path: "/login",
                element: <Login />,
              },
              {
                path: "/register",
                element: <Register />,
              },
              {
                path: "/send-verify-email",
                element: <SendVerifyEmail />
              },
              {
                path: "/verify-email",
                element: <VerifyEmail />
              },
              {
                path: "/send-reset-password",
                element: <SendResetPassword />
              },
              {
                path: '/reset-password',
                element: <ResetPassword />
              },
              {
                path: '/verify-2fa',
                element: <Verify2FA />
              }
            ]
          }
        ]
      },

      {
        element: <Authenticated />,
        children: [
          {
            element: <Root />,
            children: [
              {
                path: '/',
                element: <Navigate to="/boards" />
              },
              {
                path: '/boards',
                element: <Boards />
              },
              {
                path: '/boards/:id',
                element: <BoardDetail />
              },
              {
                path: '/profile/:tab?',
                element: <Profile />
              }
            ]
          }
        ]
      }
    ]
  },

]);
