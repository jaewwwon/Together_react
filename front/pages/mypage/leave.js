import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import styled from "styled-components";
import { USER_LEAVE_REQUEST } from "../../reducers/user";
import Lnb from "../../components/MypageLnb";
import Helmet from "react-helmet";

const Section = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const Content = styled.div`
  margin-left: 250px;
  padding: 22px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(46, 62, 72, 0.12),
    0 3px 1px -2px rgba(46, 62, 72, 0.26), 0 1px 5px 0 rgba(46, 62, 72, 0.12);
  & > h3 {
    font-size: 22px;
    font-weight: 500;
  }
`;
const Notice = styled.div`
  margin-top: 25px;
  padding: 25px 20px;
  background: #f2f2f2;
  border: 1px solid #ccc;
  & > p {
    font-weight: 500;
  }
  & > ul {
    margin-top: 12px;
  }
  & > ul > li {
    position: relative;
    padding-left: 12px;
    font-size: 15px;
    color: #666;
  }
  & > ul > li:after {
    content: "-";
    position: absolute;
    left: 0;
    top: 0;
  }
  & > ul > li + li {
    margin-top: 8px;
  }
`;
const LeaveInfo = styled.div`
  margin-top: 32px;
`;
const InputWrap = styled.div`
  & > label {
    display: inline-block;
    margin-top: 16px;
    width: 80px;
  }
  & > input {
    width: 265px;
    height: 34px;
    margin-top: 10px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
`;
const CheckWrap = styled.div`
  margin-top: 32px;
  padding: 25px 0;
  border-top: 1px solid #ddd;
  text-align: center;
  & > label {
    font-size: 15px;
  }
  & > input {
    margin-right: 2px;
    vertical-align: baseline;
  }
`;
const ButtonWrap = styled.div`
  text-align: center;
`;

const Leave = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const [userPassword, setUserPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onSubmitLeave = useCallback(
    e => {
      e.preventDefault();
      if (!userPassword) {
        alert("비밀번호를 입력하세요.");
        return;
      }
      if (!isChecked) {
        alert("유의사항에 동의하셔야 합니다.");
        return;
      }
      dispatch({
        type: USER_LEAVE_REQUEST,
        data: { userId: userInfo.id, userPassword }
      });
    },
    [userPassword, isChecked]
  );

  const onChangePassword = useCallback(e => {
    setUserPassword(e.target.value);
  }, []);

  const onChangeCheked = useCallback(e => {
    setIsChecked(!isChecked);
  }, []);

  return (
    <Section>
      <Helmet>
        <title>회원탈퇴 | Together</title>
      </Helmet>
      <Lnb path={router.pathname} />
      <Content>
        <h3>회원탈퇴</h3>
        <Notice>
          <p>
            지금까지 이용해주셔서 감사 드립니다. 탈퇴하기 전 아래 유의사항을
            확인해주세요.
          </p>
          <ul>
            <li>탈퇴하신 이메일은 복구가 불가능합니다.</li>
            <li>
              개설한 모임이 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
            </li>
            <li>
              회원탈퇴 시 등록한 게시물은 삭제되지 않으므로, 삭제를 원하시면
              회원탈퇴 전에 삭제해 주시기 바랍니다.
            </li>
          </ul>
        </Notice>
        <LeaveInfo>
          <form onSubmit={onSubmitLeave}>
            <InputWrap>
              <label htmlFor="userEmail">이메일</label>
              <input
                type="text"
                value={userInfo && userInfo.userEmail}
                disabled
              />
            </InputWrap>
            <InputWrap>
              <label htmlFor="userPassword">비밀번호</label>
              <input
                type="password"
                value={userPassword}
                onChange={onChangePassword}
                placeholder="비밀번호를 입력하세요."
                required
              />
            </InputWrap>
            <CheckWrap>
              <input
                id="agree"
                type="checkbox"
                checked={isChecked}
                onChange={onChangeCheked}
                required
              />
              <label htmlFor="agree">
                유의사항을 모두 확인하였으며, 이에 모두 동의합니다.
              </label>
            </CheckWrap>
            <ButtonWrap>
              <button className="btn btn-submit btn-middle" type="submit">
                탈퇴하기
              </button>
            </ButtonWrap>
          </form>
        </LeaveInfo>
      </Content>
    </Section>
  );
};

export default Leave;
