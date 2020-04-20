import React, { useState } from "react";
import { Layout, Input, Tooltip, Form } from "antd";
import { signout } from "../../actions";
import { useDispatch } from "react-redux";
import { Navbar } from "./Navbar";
import {SearchBar} from "./SearchBar"
import {DataResult} from "./DataResult"

export const Home = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(signout());
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="page page-home">
      <Layout>
          <Navbar
            collapsed={collapsed}
            handleClick={toggleCollapse}
            signout={handleLogout}
          />
          <SearchBar/>
          <DataResult/>
      </Layout>
    </div>
  );
};
