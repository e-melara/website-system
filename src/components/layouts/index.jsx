import React from 'react';

import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const Layout = () => {
  return (
    <main className='page-wrapper compact-wrapper'>
      <Header />
      <section className='page-body-wrapper'>
        <SideBar />
      </section>
    </main>
  );
}