import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"
import { App } from "antd"
import SiderBarLeft from "./pages/client/sidebar/SidebarLeft"
import './layout.scss'
import './styles/global.scss'
import MainSlider from "./pages/client/sidebar/MainSlider"

const Layout = () => {

  return (
    <>
      <App>
        <Appheader />
        <div className="page-container ">
          <div className="page-layout">
            <SiderBarLeft />
            <MainSlider />
          </div>
          <Outlet />
        </div>
      </App>
    </>
  )
}

export default Layout
