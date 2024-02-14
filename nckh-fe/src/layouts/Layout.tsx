import React, {useContext} from "react"
import { Layout, theme } from "antd"
import { Navigate, Outlet, Route } from 'react-router-dom';
import { RouterLinks } from '../const/RouterLinks';
import { AppContext } from '../context/appContext';
import Sidebar from "./sider/sider"

import './Layout.scss'

const {Content} = Layout

const MainLayout: React.FC = () => {
    const {socket} = useContext(AppContext)
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={"/login"} />;
      }
 return <Layout>
      <Sidebar />
    <Layout className="site-layout" style={{ marginLeft: 300 }}>
      {/* <AppHeader /> */}
        <Content
          style={{
            margin: '24px 16px 0', overflow: 'initial',
          }}
        >
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
 </Layout>
}

export default MainLayout