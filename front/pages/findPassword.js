import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

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

const Notice = styled.p`
  margin-bottom: 12px;
  color: #555;
  text-align: center;
  font-size: 15px;
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

const FindPassword = () => {
  const [userEmail, setUserEmail] = useState("");

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      console.log(userEmail);
    },
    [userEmail]
  );

  const onChangeEmail = useCallback(e => {
    setUserEmail(e.target.value);
  }, []);

  return (
    <FormWrap>
      <form onSubmit={onSubmitForm}>
        <Title>비밀번호 찾기</Title>
        <Content>
          <Notice>
            비밀번호를 잃어버리셨나요?
            <br />
            가입한 이메일을 정확히 입력해 주세요.
            <br /> 입력한 이메일을 통해 임시 비밀번호가 전송됩니다.
          </Notice>
          <InputWrap>
            <input
              type="email"
              value={userEmail}
              placeholder="가입한 이메일을 입력하세요"
              onChange={onChangeEmail}
              required
            />
          </InputWrap>
          <SubmitButton type="submit">이메일 전송</SubmitButton>
        </Content>
      </form>
    </FormWrap>
  );
};

export default FindPassword;
