import React from "react";
import { useSelector } from "react-redux";

import "./layout.scss";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import Loading from "../common/Loading";

// TODO: Arreglar la clase de footer para que cuadre bien
export const Layout = ({ children }) => {
  const { isClose, loading } = useSelector((state) => state.ui);

  return (
    <>
      <main className="page-wrapper compact-wrapper">
        <Header isClose={isClose} />
        <section className="page-body-wrapper">
          <SideBar isClose={isClose} />
          <div className="page-body">{children}</div>
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 footer-copyright text-center">
                  <p className="mb-0">UTLA 2021 © </p>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
      {loading && <Loading />}
    </>
  );
};
