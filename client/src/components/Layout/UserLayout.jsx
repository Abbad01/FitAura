import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* // Header 
    // Main content
    // Footer */}
      <Header />
      <main>
        <Outlet/>  {/*Inject <Home /> into <Outlet /> */}
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
