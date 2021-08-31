import React from "react";
import { Avatar, Row, Col, Menu, Dropdown, Button } from "antd";
import {
  BulbOutlined,
  MenuFoldOutlined,
  DisconnectOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

export const HeaderContent = ({
  collapsed,
  handler,
  handlerLogout,
  handlerTheme,
  theme,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="!#">Perfil</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="!#">Configuracion</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="!#" onClick={handlerLogout}>
          Salir
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row>
        <Col flex={2}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: handler,
              className: "toggle-span",
            }
          )}
        </Col>
        <Col flex={3} className="d-flex justify-content-end align-items-center">
          <Button
            type="text"
            size="large"
            onClick={handlerTheme}
            className="btn-theme toggle-span"
            icon={theme !== "ligth" ? <BulbOutlined /> : <DisconnectOutlined />}
          />
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Dropdown>
        </Col>
      </Row>
    </>
  );
};
