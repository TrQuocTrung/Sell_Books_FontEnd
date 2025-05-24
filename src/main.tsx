import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';
import Books from 'pages/client/books';
import About from 'pages/client/about';
import RegisterPage from 'pages/client/auth/register';
import LoginPage from 'pages/client/auth/login';
import 'styles/global.scss'
import HomePage from './pages/client/homepage';
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
      }

    ],
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
    <RouterProvider router={router} />

  </StrictMode>,
)
