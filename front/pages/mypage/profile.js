import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import styled from "styled-components";
import {
  EDIT_USER_INFO_REQUEST,
  UPLOAD_PROFILE_REQUEST,
  REMOVE_IMAGE
} from "../../reducers/user";
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
const ProfileWrap = styled.div`
  margin: 28px 0;
  text-align: center;
  img {
    width: 152px !important;
    height: 152px !important;
    border: 1px solid #ccc;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
  button {
    margin-top: 12px;
  }
`;
const InputArea = styled.div`
  & + & {
    margin-top: 12px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  label + span,
  input[type="text"] {
    width: 100%;
    height: 34px;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  input[type="password"] {
    width: 48%;
    height: 34px;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  input[type="password"] + input[type="button"] {
    margin-left: 5px;
  }
  label + span {
    display: block;
    padding-top: 7px;
    overflow: hidden;
  }
`;
const ButtonWrap = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { userInfo, imagePaths } = useSelector(state => state.user);

  const [userNickname, setUserNickname] = useState(
    userInfo && userInfo.userNickname
  );
  const [userPassword, setUserPassword] = useState("");
  const [buttonText, setButtonText] = useState("변경");
  const [userIntro, setUserIntro] = useState(
    userInfo.userIntro ? userInfo.userIntro : ""
  );
  const [selectedFile, setSelectedFile] = useState("");

  // 변경하기 버튼을 눌렀을 경우
  const onSubmitProfile = useCallback(
    e => {
      e.preventDefault();
      console.log(userNickname, imagePaths[0], userPassword, userIntro);
      dispatch({
        type: EDIT_USER_INFO_REQUEST,
        data: {
          userNickname,
          userPassword,
          userIntro,
          userProfile: imagePaths[0]
        }
      });
    },
    [userNickname, userPassword, userIntro, imagePaths[0]]
  );

  // 닉네임 값 적용
  const onChangeNickname = useCallback(e => {
    setUserNickname(e.target.value);
  }, []);

  // 비밀번호 값 적용
  const onChangePassword = useCallback(
    e => setUserPassword(e.target.value),
    []
  );

  // 소개란 값 적용
  const onChangeIntro = useCallback(e => setUserIntro(e.target.value), []);

  // 비밀번호를 변경 버튼을 눌렀을 경우
  const onPasswordChange = e => {
    e.preventDefault();
    const inputPassword = document.getElementById("password");

    if (inputPassword.disabled) {
      inputPassword.disabled = false;
      setButtonText("취소");
    } else {
      inputPassword.disabled = true;
      setUserPassword("");
      setButtonText("변경");
    }
  };

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_PROFILE_REQUEST,
      data: imageFormData
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index
      });
    },
    []
  );

  return (
    <Section>
      <Helmet title="내 프로필 | Together" />
      <Lnb path={router.pathname} />
      <Content>
        <h3>내 프로필</h3>
        <div>
          <ProfileWrap>
            {imagePaths.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8080/${image}`}
                  style={{ width: "200px" }}
                  alt="프로필 사진"
                />
                <div>
                  <button
                    button
                    className="btn btn-dark"
                    type="button"
                    onClick={onRemoveImage(index)}
                  >
                    제거
                  </button>
                </div>
              </div>
            ))}

            {userInfo.userProfile && imagePaths.length == 0 && (
              <img src={`http://localhost:8080/${userInfo.userProfile}`} />
            )}

            {!userInfo.userProfile && imagePaths.length == 0 && (
              <img src="../icon_profile.png" />
            )}

            {imagePaths.length == 0 && (
              <div>
                <input
                  type="file"
                  multiple
                  hidden
                  ref={imageInput}
                  onChange={onChangeImages}
                />
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={onClickImageUpload}
                >
                  프로필 변경
                </button>
              </div>
            )}
          </ProfileWrap>
          <form onSubmit={onSubmitProfile}>
            <InputArea>
              <label htmlFor="">이메일</label>
              <span>{userInfo && userInfo.userEmail}</span>
            </InputArea>
            <InputArea>
              <label htmlFor="">닉네임</label>
              <input
                type="text"
                value={userNickname}
                onChange={onChangeNickname}
                placeholder="닉네임을 입력하세요."
              />
            </InputArea>
            <InputArea>
              <label htmlFor="">비밀번호</label>
              <input
                id="password"
                type="password"
                value={userPassword}
                onChange={onChangePassword}
                disabled
              />
              <input
                type="button"
                onClick={onPasswordChange}
                value={buttonText}
                className="btn"
              />
            </InputArea>
            <InputArea>
              <label htmlFor="">내소개</label>
              <input
                type="text"
                value={userIntro}
                onChange={onChangeIntro}
                placeholder="다른 사람들에게 나를 소개해보세요."
              />
            </InputArea>
            <ButtonWrap>
              <button type="submit" className="btn btn-submit btn-middle">
                변경하기
              </button>
            </ButtonWrap>
          </form>
        </div>
      </Content>
    </Section>
  );
};

export default Profile;
