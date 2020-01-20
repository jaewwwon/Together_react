import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  CREATE_GROUP_REQUEST,
  UPLOAD_GROUP_IMAGE_REQUEST,
  REMOVE_GROUP_IMAGE
} from "../reducers/group";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const Table = styled.table`
  width: 100%;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 4px solid #555;
  & > tbody > tr > th,
  & > tbody > tr > td {

    border-bottom: 1px solid #ccc;
    font-size: 15px;
  }
  & > tbody > tr > th {
    padding: 16px 10px
    font-weight: 400;
    text-align: left;
  }
  & > tbody > tr > td {
    padding: 5px 10px
  }
  & > tbody > tr > td > input[type="text"],
  & > tbody > tr > td > select {
    width: 100%;
    height: 42px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  & > tbody > tr > td > textarea{
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  td.thumbnail > div{
    position: relative;
    width: 78%;
    height: 0;
    padding-top: 39%;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  td.thumbnail > div > img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    height: 100%;
    object-fit: cover;
  }
  td.thumbnail > div > .btn{
    position:absolute;
    bottom: 5px;
    right: 5px;
  }
`;
const Title = styled.div`
  margin-top: 55px;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
`;
const SubTitle = styled.div`
  margin: 10px 0 62px;
  font-size: 17px;
  color: #666;
  text-align: center;
`;
const ButtonWrap = styled.div`
  margin-top: 12px;
  text-align: right;
`;

const FormGroup = () => {
  const { groupImages } = useSelector(state => state.group);
  const [groupCategory, setGroupCategory] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [focusForm, setFocusForm] = useState(false);
  const [groupInfo, setGroupInfo] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  // const onMovePage = () => {
  //   Router.push("/login");
  // };

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: CREATE_GROUP_REQUEST,
        data: {
          groupCategory,
          groupImage: groupImages[0],
          groupName,
          groupInfo
        }
      });
    },
    [groupCategory, groupImage, groupName, groupInfo]
  );

  const onChangeCategory = useCallback(e => {
    setGroupCategory(e.target.value);
  }, []);

  const onChangeName = useCallback(e => {
    setGroupName(e.target.value);
  }, []);

  const onChangeIntro = useCallback(e => {
    setGroupInfo(e.target.value);
  }, []);

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_GROUP_IMAGE_REQUEST,
      data: imageFormData
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_GROUP_IMAGE,
        index
      });
    },
    []
  );

  return (
    <Container>
      <form onSubmit={onSubmitForm} encType="multipart/form-data">
        <Title>모임을 소개해 주세요.</Title>
        <SubTitle>
          입력한 정보는 다른 회원들에게 모임을 홍보할 때 표시됩니다.
          <br /> 변경사항이 있다면 나중에 언제든지 수정이 가능합니다.
        </SubTitle>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <label htmlFor="groupCategory">모임 카테고리</label>
              </th>
              <td>
                <select
                  id="groupCategory"
                  value={groupCategory}
                  onChange={onChangeCategory}
                  required
                >
                  <option value="">카테고리 선택</option>
                  <option value="IT">IT</option>
                  <option value="게임">게임</option>
                  <option value="사진촬영">사진촬영</option>
                  <option value="운동">운동</option>
                  <option value="음악">음악</option>
                  <option value="영화">영화</option>
                  <option value="요리">요리</option>
                  <option value="반려동물">반려동물</option>
                  <option value="학습">학습</option>
                  <option value="춤">춤</option>
                  <option value="기타">기타</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>모임 대표이미지</th>
              <td className="thumbnail">
                {groupImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:8080/${image}`}
                      style={{ width: "200px" }}
                      alt="프로필 사진"
                    />
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={onRemoveImage(index)}
                    >
                      제거
                    </button>
                  </div>
                ))}

                {groupImages.length == 0 && (
                  <div>
                    <img src="bg_default_large.gif" />
                    <input
                      type="file"
                      multiple
                      hidden
                      ref={imageInput}
                      onChange={onChangeImages}
                    />
                    <button
                      className="btn"
                      type="button"
                      onClick={onClickImageUpload}
                    >
                      이미지 업로드
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="groupName">모임 이름</label>
              </th>
              <td>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={onChangeName}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="groupInfo">모임 소개</label>
              </th>
              <td>
                <textarea
                  id="groupInfo"
                  rows="10"
                  cols="200"
                  value={groupInfo}
                  onChange={onChangeIntro}
                  wrap="hard"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </Table>
        <ButtonWrap>
          <button type="submit" className="btn btn-middle btn-submit">
            모임 만들기
          </button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default FormGroup;
