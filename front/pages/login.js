import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { LOG_IN_REQUEST } from "../reducers/user";

const FormWrap = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const Title = styled.h2`
  margin: 50px auto 42px;
  font-size: 30px;
  font-weight: 500;
  color: #4d4d4d;
  text-align: center;
`;
const Content = styled.div`
  padding: 30px 20px;
  border: 1px solid #e1e3e2;
  border-radius: 4px;
`;
const InputWrap = styled.div`
  & + & {
    margin-top: 15px;
  }
  & > label {
    display: block;
    margin-bottom: 5px;
  }
  & > input {
    display: block;
    width: 100%;
    height: 42px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  margin-top: 42px;
  text-align: center;
  font-weight: 500;
  background: #03a9f4;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 8px 0;
  color: #fff;
  transition: 0.25s ease-in-out

  &:hover {
    background: #2196f3;
  }
`;
const FindLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: right;
  color: #555;
`;
const SignupLink = styled.a`
  display: block;
  margin-top: 25px;
  text-align: center;
  color: #555;

  & > span {
    font-weight: 500;
    color: #333;
  }
`;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.user);

  // 로그인 상태일 경우 메인 페이지로 돌아간다.
  useEffect(() => {
    if (userInfo) {
      Router.push("/");
      // Router.back();
    }
  }, [userInfo && userInfo.id]);

  // 로그인 버튼을 눌렀을 경우
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userEmail,
          userPassword
        }
      });
    },
    [userEmail, userPassword]
  );

  const onChangeEmail = useCallback(e => {
    setUserEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setUserPassword(e.target.value);
  }, []);

  if (userInfo) {
    return null;
  }

  return (
    <FormWrap>
      <form onSubmit={onSubmitForm}>
        <Title>로그인</Title>
        <Content>
          <InputWrap>
            <label htmlFor="userEmail">이메일</label>
            <input
              id="userEmail"
              type="email"
              value={userEmail}
              placeholder="이메일을 입력하세요"
              onChange={onChangeEmail}
              required
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              id="userPassword"
              type="password"
              value={userPassword}
              placeholder="비밀번호를 입력하세요"
              onChange={onChangePassword}
              required
            />
          </InputWrap>
          <Link href="/findPassword">
            <FindLink>비밀번호 찾기</FindLink>
          </Link>
          <SubmitButton type="submit">로그인</SubmitButton>
        </Content>
      </form>
      <Link href="/signup">
        <SignupLink>
          아직 회원이 아니신가요? <span>회원가입</span>
        </SignupLink>
      </Link>
    </FormWrap>
  );
};

export default Login;
