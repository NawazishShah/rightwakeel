import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project-imports
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import LawyerDetail from 'sections/main-listing/LawyerDetail';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));
const PageListing = Loadable(lazy(() => import('pages/listing')));

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <CommonLayout layout="landing" />,
      children: [
        {
          path: '/',
          element: <PagesLanding />
        },
        {
          path: '/lawyers',
          element: <PageListing />
        },
        {
          path: '/lawyer/:id',
          element: <LawyerDetail />
        }
      ]
    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
