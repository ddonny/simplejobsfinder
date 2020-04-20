import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Badge, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TableOutlined,
  TagsOutlined,
  ProfileOutlined,
  SwitcherOutlined,
  SolutionOutlined
} from "@ant-design/icons";
import { SidebarLogo } from "../../components/SidebarLogo";

export const Sidebar = props => {
  const { Sider } = Layout;
  const { Item, SubMenu } = Menu;

  // eslint-disable-next-line no-unused-vars
  const [current, setCurrent] = useState(0);

  const adminId = useSelector(state => state.auth.admin.adminId);
  // const wait = useSelector(state => state.orders.wait);
  // const dispatching = useSelector(state => state.orders.dispatching);
  // const refunding = useSelector(state => state.orders.refunding);

  const handleClick = e => {
    const key = e.key;
    setCurrent(key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <SidebarLogo />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        onClick={handleClick}
      >
        <Item key="0">
          <Link to="/home">
            <DashboardOutlined />
            <span>dashboard</span>
          </Link>
        </Item>
        {/* <Item key="1">
          <Link to="users">
            <UserOutlined />
            <span>User information management</span>
          </Link>
        </Item>
        <Item key="2">
          <Link to="/goods">
            <TableOutlined />
            <span>Commodity information management</span>
          </Link>
        </Item>
        <SubMenu
          title={
            <span>
              <TagsOutlined />
              Commodity classification management
            </span>
          }
        >
          <Item key="3">
            <Link to="/category/first">
              <span>Primary classification</span>
            </Link>
          </Item>
          <Item key="4">
            <Link to="/category/second">
              <span>Secondary classification</span>
            </Link>
          </Item>
        </SubMenu>
        <SubMenu
          title={
            <span>
              <ProfileOutlined />
              Order information management
            </span>
          }
        >
          <Item key="5">
            <Link to="/orders">
              <span>Order Tracking</span>
            </Link>
          </Item>
          <Item key="6">
            <Badge count={0}>
              <Link to="/order/dispatch">
                <span>Order delivery&nbsp;&nbsp;</span>
              </Link>
            </Badge>
          </Item>
          <Item key="7">
            <Badge count={0}>
              <Link to="/order/refund">
                <span>Refund processing&nbsp;&nbsp;</span>
              </Link>
            </Badge>
          </Item>
        </SubMenu>
        <Item key="8">
          <Link to="/advertisments">
            <SwitcherOutlined />
            <span>Sliding Ads Management</span>
          </Link>
        </Item> */}
        {adminId === 100 ? (
          <Item key="9">
            <Link to="/admins">
              <SolutionOutlined />
              <span>Administrator Information Management</span>
            </Link>
          </Item>
        ) : null}
      </Menu>
    </Sider>
  );
};
