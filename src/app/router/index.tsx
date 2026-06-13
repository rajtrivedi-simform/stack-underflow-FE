import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from '../../pages/Auth/index';
import HomePage from '../../pages/Home/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
