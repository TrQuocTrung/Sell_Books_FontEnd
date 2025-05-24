import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"
import { App } from "antd"

const Layout = () => {
  return (
    <>
      <App>
        <Appheader />
        <Outlet />
      </App>

    </>
  )
}

export default Layout
