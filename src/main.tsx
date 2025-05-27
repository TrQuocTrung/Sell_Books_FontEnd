import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';
import About from 'pages/client/about';
import RegisterPage from 'pages/client/auth/register';
import LoginPage from 'pages/client/auth/login';
import 'styles/global.scss'
import HomePage from 'pages/client/homepage';
import { AppProvider } from 'components/context/app.context';
import ProtectedRoute from 'components/authProtected/auth';
import DashboardPage from './components/admin/dashboard';
import LayoutAdmin from './components/admin/layoutAdmin';
let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {

        path: "/books",
        element: <div></div>
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <div>Checkout Page</div>
          </ProtectedRoute>
        )

      }

    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute>
      <LayoutAdmin />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {

        path: "books",
        element: <div></div>
      },
      {
        path: "oders",
        element: <div></div>
      },
      {
        path: "categories",
        element: <div></div>
      },
      {
        path: "reviews",
        element: <div></div>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
