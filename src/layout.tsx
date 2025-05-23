import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"

const Layout = () => {
  return (
    <>
      <Appheader />
      <Outlet />
    </>
  )
}

export default Layout
