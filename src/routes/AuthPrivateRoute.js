import { Layout } from "antd";
import { connect } from "react-redux";
import React, { useCallback } from "react";
import classNames from "classnames";

import "../components/layouts/layout.scss";

import Route from "../routes/routes";
import { logout } from "../redux/ducks/login";
import Loading from "../components/common/Loading";
import { SiderBar } from "../components/layouts/Sidebar";
import { changeUiSidebar, changeUiTheme } from "../redux/ducks/ui";
import { HeaderContent } from "../components/layouts/Header/HeaderContent";

const { Sider, Header, Footer, Content } = Layout;

function AuthPrivateRoute({
  open,
  theme,
  loading,
  setOpen,
  data,
  perfil,
  routes,
  carrera,
  getLogout,
  setTheme,
}) {
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
      <Layout className="max-heigth-100vh">
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
        <Layout className="site-layout">
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
            <div className="site-layout-background" style={{ margin: 40 }}>
              {<Route routesState={routes} />}
            </div>
          </Content>
          <Footer className="text-center">
            ©2021 UTLA todos los derechos reservados
          </Footer>
        </Layout>
      </Layout>
      {loading && <Loading />}
    </>
  );
}

const mapDispathToProps = (dispatch) => {
  return {
    getLogout: () => dispatch(logout()),
    setTheme: () => dispatch(changeUiTheme()),
    setOpen: () => dispatch(changeUiSidebar()),
  };
};

const mapStateToProps = (state) => {
  const { open, loading, theme } = state.ui;
  const { data, perfil, routes, carrera } = state.auth;
  return {
    open,
    loading,
    theme,
    data,
    perfil,
    routes,
    carrera,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(AuthPrivateRoute);
