import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';
import Books from 'pages/client/books';
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
        element: <Books />
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
        element: <Books />
      },
      {
        path: "oders",
        element: <Books />
      },
      {
        path: "categories",
        element: <Books />
      },
      {
        path: "reviews",
        element: <Books />
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
