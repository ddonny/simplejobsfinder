import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import {MdPerson} from 'react-icons/md';
import {history} from './../../history'
const { Header } = Layout;

export const Navbar = props => {
  const [goToUrl, setGoToUrl] = useState("")
  const handleSignout = () => {
    props.signout();
  };
  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/signin">logout</Link>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <Header className="navbar-wrapper-header">
      {
        (goToUrl != "") ?
        <Redirect
          to={{
            pathname: goToUrl,
            from: {
              from: props.location
            }
          }}
        />:
        <nav className="navbar">
          <ul className="nav">
            <li className="nav-item">
              <span>
                <span className="github">GitHub</span>
                <span className="suffix">Jobs</span>
              </span>
            </li>
          </ul>
          <ul className="nav navbar-right">
            <Dropdown overlay={menu}>
              <li className="nav-item">
                <MdPerson color="#FFF" className="person"/>
              </li>
            </Dropdown>
          </ul>
        </nav>
      }
    </Header>
  );
};
