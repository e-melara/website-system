import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import Footer from "./Footer";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import Loading from "../common/Loading";

export const Layout = ({ children, classBodyOther }) => {
  const { isClose, loading } = useSelector((state) => state.ui);

  let c = classNames({
    "page-body": true,
    minHeigth: true,
    ...classBodyOther,
  });

  return (
    <>
      <main className="page-wrapper compact-wrapper">
        <Header isClose={isClose} />
        <div className="page-body-wrapper">
          <SideBar isClose={isClose} />
          <div className={c}>{children}</div>
          <Footer />
        </div>
      </main>
      {loading && <Loading />}
    </>
  );
};
