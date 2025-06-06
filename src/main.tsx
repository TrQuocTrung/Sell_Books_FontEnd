import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';
import RegisterPage from 'pages/client/auth/register';
import LoginPage from 'pages/client/auth/login';
import 'styles/global.scss'
import HomePage from 'pages/client/homepage';
import { AppProvider } from 'components/context/app.context';
import ProtectedRoute from 'components/authProtected/auth';
import DashboardPage from './components/admin/dashboard';
import LayoutAdmin from './components/admin/layoutAdmin';
import DetailBook from './pages/client/books/detailBook';
import IntroductionCompany from './pages/client/introductionCompany';
import { CartProvider } from './components/context/CartContext';
import ProfileUser from './pages/client/profileUser';
import ListBook from './pages/client/books/listbook';
import ManagerBooks from './pages/admin/managerBook/manager.books';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import ManagerUsers from './pages/admin/managerUser/manage.user';
import ManagerOrders from './pages/admin/managerOrder/manager.orders';
import ManagerReview from './pages/admin/managerReview/manage.reviews';

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
        element: <ListBook />
      },
      {
        path: "/books/:id",
        element: <DetailBook />
      },
      {
        path: "/profile",
        element: <ProfileUser />
      },
      {
        path: "/about",
        element: <IntroductionCompany />
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
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {

        path: "users",
        element: <ManagerUsers />
      },
      {

        path: "books",
        element: <ManagerBooks />
      },
      {
        path: "orders",
        element: <ManagerOrders />
      },
      {
        path: "reviews",
        element: <ManagerReview />
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
      <CartProvider>
        <ConfigProvider locale={viVN}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </CartProvider>
    </AppProvider>
  </StrictMode>,
)
