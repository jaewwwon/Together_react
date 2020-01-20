import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

const Lnb = styled.div`
  position: absolute;
  left: 15px;
  top: 0;
  width: 210px;
  margin-top: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(46, 62, 72, 0.12),
    0 3px 1px -2px rgba(46, 62, 72, 0.26), 0 1px 5px 0 rgba(46, 62, 72, 0.12);
  & > h2 {
    padding: 20px 15px 15px;
    font-size: 15px;
    font-weight: 500;
  }
  & > ul {
    padding: 12px 0;
    border-top: 1px solid #ddd;
  }
  & > ul > li > a {
    display: block;
    padding: 12px 15px;
    font-size: 15px;
  }
  & > ul > li.is-active > a {
    font-weight: 500;
    color: #009688;
  }
`;

const MypageLnb = ({ path }) => {
  return (
    <Lnb>
      <h2>마이페이지</h2>
      <ul>
        <li className={path === "/mypage/manage" ? "is-active" : "link"}>
          <Link href="/mypage/manage">
            <a>모임관리</a>
          </Link>
        </li>
        <li className={path === "/mypage/profile" ? "is-active" : "link"}>
          <Link href="/mypage/profile">
            <a>내 프로필</a>
          </Link>
        </li>
        <li className={path === "/mypage/leave" ? "is-active" : "link"}>
          <Link href="/mypage/leave">
            <a>회원탈퇴</a>
          </Link>
        </li>
      </ul>
    </Lnb>
  );
};

export default MypageLnb;
