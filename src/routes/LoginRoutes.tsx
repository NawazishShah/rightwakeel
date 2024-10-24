import { lazy } from 'react';

// project-imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthLoginLawyer from 'sections/auth/auth-forms/AuthLoginLawyer';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/auth1/register')));
const AuthRegisterLawyer = Loadable(lazy(() => import('pages/auth/auth1/register-lawyer')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth1/forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth1/check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth1/reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth1/code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: '/lawyer/login',
          element: <AuthLoginLawyer />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'lawyer/register',
          element: <AuthRegisterLawyer />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    }
  ]
};

export default LoginRoutes;
