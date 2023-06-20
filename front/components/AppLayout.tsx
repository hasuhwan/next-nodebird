import Link from "next/link";
import React, { useState, useCallback } from "react";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store/configureStore";
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
import { createGlobalStyle } from "styled-components";

type LayoutProps = {
  children: React.ReactNode;
};
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
const AppLayout = ({ children }: LayoutProps) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [current, setCurrent] = useState("home");
  const onMenu = useCallback((e: any) => {
    console.log(e);
    setCurrent(e.key);
  }, []);
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

export default AppLayout;
