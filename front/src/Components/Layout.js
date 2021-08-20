import React from "react";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import Notification from "./Notification/Notification";
import LoadingOverlay from "react-loading-overlay-ts";
import Dashboard from "../Containers/Dashboard/Dashboard";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.auth);

  //admin dasboard
  if (user.role === "issuer") {
    return (
      <LoadingOverlay active={loading ? true : false} spinner text="Loading ...">
        <Helmet>
          <style>{"body { background-color: #fff; }"}</style>
        </Helmet>
        <Dashboard>{children}</Dashboard>
      </LoadingOverlay>
    );
    //normal user
  } else {
    return (
      <LoadingOverlay active={loading ? true : false} spinner text="Loading ...">
        <Helmet>
          <style>{"body { background-color: #42455a; }"}</style>
        </Helmet>
        <Navbar />
        <div className="container">{children}</div>
      </LoadingOverlay>
    );
  }
};

export default Layout;
