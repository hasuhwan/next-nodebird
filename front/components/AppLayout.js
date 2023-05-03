import PropTypes from "prop-types";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
.ant-row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.ant-col:first-child{
  padding-left: 0 !important;
}
.ant-col:last-child{
  padding-right: 0 !important;
}
`;
const menuItems = [
  { label: <Link href="/">노드버드</Link>, key: "home" },
  { label: <Link href="/profile">profile</Link>, key: "profile" },
  { label: <Link href="/signup">회원가입</Link>, key: "signup" },
  { label: <SearchInput />, key: "searchInput" },
];
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [current, setCurrent] = useState("home");
  const onMenu = useCallback((e) => {
    setCurrent(e.key);
  });
  return (
    <div>
      <Global />
      <Menu
        onClick={onMenu}
        selectedKeys={[current]}
        items={menuItems}
        mode="horizontal"
      ></Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/hasuhwan"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Hasuhwan
          </a>
        </Col>
      </Row>
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
