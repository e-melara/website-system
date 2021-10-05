import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  ApartmentOutlined,
  HomeFilled,
  RadarChartOutlined,
} from "@ant-design/icons";
import { BaseAssets } from "../../consts";

// import LogoUtla from "../../assets/images/logo/utla.png";

const { SubMenu } = Menu;

export const SiderBar = ({ routes, theme }) => {
  const location = useLocation();
  return (
    <>
      <div className="logo">
        <img src={`${BaseAssets}files/utla.png`} alt="imgs for logo" />
      </div>
      <Menu theme={theme} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item icon={<HomeFilled />} key="/">
          <Link to='/'>{"Inicio"}</Link>
        </Menu.Item>
        <SubMenu
          key="sub-1"
          icon={<ApartmentOutlined />}
          title="Registro"
        >
          {routes &&
            routes.map(({ nombre, short_name }, index) => (
              <Menu.Item key={short_name} icon={<RadarChartOutlined />}>
                <Link to={short_name}>{nombre}</Link>
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
    </>
  );
};
