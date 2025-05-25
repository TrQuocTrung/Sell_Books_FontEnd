import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"
import { App } from "antd"
import SiderBarLeft from "./pages/client/sidebar/SidebarLeft"
const Layout = () => {

  return (
    <>
      <App>
        <Appheader />
        <div className="page-container page-layout">
          <SiderBarLeft />
          <Outlet />
        </div>

      </App>
    </>
  )
}

export default Layout
