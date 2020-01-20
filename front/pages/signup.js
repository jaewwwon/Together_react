import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "../reducers/user";

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
const LoginLink = styled.a`
  display: block;
  margin-top: 25px;
  text-align: center;
  color: #555;

  & > span {
    font-weight: 500;
    color: #333;
  }
`;
const ErrorText = styled.p`
  margin-top: 5px;
  font-size: 15px;
  color: #db3c31;
`;
const NoticeText = styled.p`
  padding: 25px 0;
  line-height: 1.55;
  text-align: center;
`;

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { userInfo, isSignedUp } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (userPassword !== userPasswordCheck) {
        return setPasswordError(true);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          userEmail,
          userNickname,
          userPassword
        }
      });
    },
    [userEmail, userNickname, userPassword, userPasswordCheck]
  );

  const onChangeEmail = useCallback(e => {
    setUserEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setUserNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(
    e => {
      setPasswordError(e.target.value !== userPasswordCheck);
      setUserPassword(e.target.value);
    },
    [userPasswordCheck]
  );

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== userPassword);
      setUserPasswordCheck(e.target.value);
    },
    [userPassword]
  );

  return (
    <FormWrap>
      <form onSubmit={onSubmitForm}>
        <Title>회원가입</Title>
        {userInfo ? (
          <NoticeText>
            현재 회원님은 로그인 상태입니다. <br /> 회원가입을 원하실 경우
            로그아웃 상태에서 이용해주세요.
          </NoticeText>
        ) : (
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
              <label htmlFor="userNickname">닉네임</label>
              <input
                id="userNickname"
                type="text"
                value={userNickname}
                placeholder="닉네임을 입력하세요"
                onChange={onChangeNickname}
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
            <InputWrap>
              <label htmlFor="userPasswordCheck">비밀번호 확인</label>
              <input
                id="userPasswordCheck"
                type="password"
                value={userPasswordCheck}
                placeholder="비밀번호를 재입력하세요"
                onChange={onChangePasswordCheck}
                required
              />
            </InputWrap>
            {passwordError && (
              <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
            )}
            <SubmitButton type="submit">회원가입</SubmitButton>
          </Content>
        )}
      </form>
      {!userInfo && (
        <Link href="/login">
          <LoginLink>
            이미 회원이신가요? <span>로그인</span>
          </LoginLink>
        </Link>
      )}
    </FormWrap>
  );
};

export default Signup;
