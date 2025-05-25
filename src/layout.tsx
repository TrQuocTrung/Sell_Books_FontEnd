import { Outlet } from "react-router-dom"
import Appheader from "./components/layout/app.header"
import { App } from "antd"
import { useEffect } from "react"
import { getUserApi } from "./service/api"
import { useCurrentApp } from "components/context/app.context"
import { RingLoader } from "react-spinners";
const Layout = () => {
  const { setUser, setIsAuthenticated, isApploading, setisApploading } = useCurrentApp()
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await getUserApi()
      if (res.data) {
        setUser(res.data.user)
        setIsAuthenticated(true)
      }
      setisApploading(false)
    }
    fetchAccount()
  }, [])
  return (
    <>
      {isApploading === false ?
        <App>
          <Appheader />
          <Outlet />
        </App>
        :
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <RingLoader
            size={80}
            color="#36d7b7"
          />
        </div>
      }
    </>
  )
}

export default Layout
