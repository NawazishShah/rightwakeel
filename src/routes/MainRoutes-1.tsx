import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - profiles
const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));

// render - tables
const ReactTableBasic = Loadable(lazy(() => import('pages/tables/react-table/basic')));
const ReactTableSorting = Loadable(lazy(() => import('pages/tables/react-table/sorting')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'profiles',
          children: [
            {
              path: 'user',
              element: <UserProfile />
            },
            {
              path: 'account',
              element: <AccountProfile />
            }
          ]
        },
        {
          path: 'tables',
          children: [
            {
              path: 'basic',
              element: <ReactTableBasic />
            },
            {
              path: 'sorting',
              element: <ReactTableSorting />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
