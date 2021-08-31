import React, { useState } from "react";
import { Layout as LayoutAnt } from "antd";

import "./layout.scss";
import { SiderBar } from "./Sidebar/";
import { HeaderContent } from "./Header/HeaderContent";
import { useSelector } from "react-redux";

const { Sider, Header, Content } = LayoutAnt;

export const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handlerToggle = () => setCollapsed(!collapsed);

  const { routes } = useSelector((state) => state.auth);

  return (
    <LayoutAnt className="max-heigth-100vh">
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
        <SiderBar routes={routes} />
      </Sider>
      <LayoutAnt className="site-layout">
        <Header className="site-layout-background">
          <HeaderContent collapsed={collapsed} handler={handlerToggle} />
        </Header>
        <Content className="site-layout-content">{children}</Content>
      </LayoutAnt>
    </LayoutAnt>
  );
};