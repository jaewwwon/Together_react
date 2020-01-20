import React, { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import { LOG_OUT_REQUEST, LOAD_USER_REQUEST } from "../reducers/user";
import "../public/common.css";

const Container = styled.div`
  padding-top: 95px;
`;
const HeaderWrap = styled.div`
  z-index: 1100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 28px 15px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 3px 3px rgba(45, 64, 114, 0.2);
`;
const Logo = styled.h1`
  float: left;
  color: #f64060;
  font-size: 32px;
`;
const Utils = styled.div`
  float: right;
  & > a {
    margin: 0 5px;
    line-height: 38px;
  }
`;
const LoginInfo = styled.div`
  position: relative;
`;
const DropdownMenuButton = styled.button`
  position: relative;
  background: transparent;
  border: 0;
  line-height: 36px;
  cursor: pointer;

  & > img {
    display: inline-block;
    width: 38px;
    height: 38px;
    border: 1px solid #eee;
    border-radius: 50%;
    object-fit: cover;
  }
  & > span {
    margin-left: 7px;
  }
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0px;
  margin-top: 7px;
  padding: 6px 0;
  background-color: #fff;
  border: 1px solid rgba(46, 62, 72, 0.12);
  border-radius: 4%;
  box-shadow: 0 2px 2px 0 rgba(46, 62, 72, 0.12),
    0 3px 1px -2px rgba(46, 62, 72, 0.26), 0 1px 5px 0 rgba(46, 62, 72, 0.12);
  box-sizing: border-box;
  &:after,
  &:before {
    content: "";
    z-index: 11;
    position: absolute;
  }
  &:after {
    top: -9px;
    right: 9px;
    width: 0;
    height: 0;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
  &:before {
    top: -10.5px;
    right: 8px;
    width: 0;
    height: 0;
    border-bottom: 11px solid rgba(46, 62, 72, 0.12);
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
  }
  .btn {
    min-width: 72px;
    padding: 2px 12px 2px 12px;
    background: transparent;
    border: 0;
    font-size: 14px;
    color: #333;
    width: 100%;
    text-align: left;
  }
  .btn:hover {
    text-decoration: underline;
  }
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  const menu = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [toggleMenu]);

  const onClickOutside = useCallback(e => {
    if (menu.current && !menu.current.contains(e.target)) {
      setToggleMenu(false);
    }
  }, []);

  const onLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      dispatch({
        type: LOG_OUT_REQUEST
      });
    }
    setToggleMenu(false);
  };

  const onToggleMenu = useCallback(() => {
    setToggleMenu(!toggleMenu);
  }, [toggleMenu]);

  return (
    <>
      <GlobalStyles />
      <HeaderWrap>
        <Logo>
          <Link href="/">
            <a>Together</a>
          </Link>
        </Logo>
        <Utils>
          {userInfo ? (
            <LoginInfo>
              <DropdownMenuButton type="button" onClick={onToggleMenu}>
                <img
                  src={
                    userInfo.userProfile
                      ? `http://localhost:8080/${userInfo.userProfile}`
                      : "http://localhost:3000/icon_profile.png"
                  }
                  alt="프로필사진"
                />
                <span>{userInfo.userNickname}</span>
              </DropdownMenuButton>
              {toggleMenu && (
                <DropdownMenu ref={menu}>
                  <li>
                    <Link href="/mypage/manage">
                      <a className="btn" onClick={onToggleMenu}>
                        마이페이지
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button className="btn" type="button" onClick={onLogout}>
                      로그아웃
                    </button>
                  </li>
                </DropdownMenu>
              )}
            </LoginInfo>
          ) : (
            <>
              <Link href="/login">
                <a>로그인</a>
              </Link>
              <Link href="/signup">
                <a>회원가입</a>
              </Link>
            </>
          )}
        </Utils>
      </HeaderWrap>
      <Container>{children}</Container>
    </>
  );
};

export default AppLayout;
