import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"
import { App } from "antd"
import SiderBarLeft from "./pages/client/sidebar/SidebarLeft"
import './layout.scss'
import './styles/global.scss'
import MainSlider from "./pages/client/sidebar/MainSlider"
import EmailFooter from "./pages/client/footerbar/emailfooter"
import FooterLayout from 'pages/client/footerbar/footer'
import CertificationFooter from "./pages/client/footerbar/CertificationFooter"

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
        <EmailFooter />
        <FooterLayout />
        <CertificationFooter />
      </App>
    </>
  )
}

export default Layout
