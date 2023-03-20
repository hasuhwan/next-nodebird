import PropTypes from "prop-types";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const menuItems = [
  { label: <Link href="/">노드버드</Link>, key: "home" },
  { label: <Link href="/profile">profile</Link>, key: "profile" },
  { label: <Link href="/signup">회원가입</Link>, key: "signup" },
  { label: <SearchInput />, key: "searchInput" },
];
const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [current, setCurrent] = useState("home");
  const onMenu = useCallback((e) => {
    setCurrent(e.key);
  });
  return (
    <div>
      <Menu
        onClick={onMenu}
        selectedKeys={[current]}
        items={menuItems}
        mode="horizontal"
      ></Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
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
