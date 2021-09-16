import classNames from "classnames";
import { connect } from "react-redux";
import React, { useCallback } from "react";
import { Layout as LayoutAntd } from "antd";

import "./layout.scss";

import { SiderBar } from "./Sidebar";
import Loading from "../common/Loading";
import { HeaderContent } from "./Header";

import { logout } from "../../redux/ducks/login";
import { changeUiSidebar, changeUiTheme } from "../../redux/ducks/ui";

const { Sider, Header, Footer, Content } = LayoutAntd;

const Layout = ({
  rol,
  open,
  data,
  theme,
  perfil,
  routes,
  setOpen,
  loading,
  carrera,
  children,
  setTheme,
  getLogout,
}) => {
  const handlerChange = useCallback(() => setOpen(), [setOpen]);
  const user = Object.assign({
    data,
    perfil,
    carrera,
  });
  const handlerLogout = (e) => {
    e.preventDefault();
    getLogout();
  };

  return (
    <>
      <LayoutAntd className="max-heigth-100vh">
        <Sider
          style={{
            backgroundColor: theme === "ligth" && "white",
          }}
          trigger={null}
          collapsible
          collapsed={open}
        >
          <SiderBar routes={routes} theme={theme} />
        </Sider>
        <LayoutAntd className="site-layout">
          <Header
            className={classNames({
              "site-layout-background": theme === "ligth",
              "site-layout-background-btn": theme === "ligth",
            })}
          >
            <HeaderContent
              user={user}
              theme={theme}
              collapsed={open}
              handlerTheme={setTheme}
              handler={handlerChange}
              handlerLogout={handlerLogout}
            />
          </Header>
          <Content>
            <div
              className={classNames({
                "site-layout-background site-content-layout-m4": true,
              })}
            >
              {children}
            </div>
          </Content>
          <Footer className="text-center">
            ©2021 UTLA todos los derechos reservados
          </Footer>
        </LayoutAntd>
      </LayoutAntd>
      {loading && <Loading />}
    </>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    getLogout: () => dispatch(logout()),
    setTheme: () => dispatch(changeUiTheme()),
    setOpen: () => dispatch(changeUiSidebar()),
  };
};

const mapStateToProps = (state) => {
  const { open, loading, theme } = state.ui;
  const { data, perfil, routes, carrera, rol } = state.auth;
  return {
    rol,
    open,
    theme,
    data,
    routes,
    perfil,
    loading,
    carrera,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Layout);
