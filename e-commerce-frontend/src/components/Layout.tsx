import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <Outlet /> {/* This renders the page content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
