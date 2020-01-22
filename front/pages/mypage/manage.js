import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCog } from "@fortawesome/free-solid-svg-icons";
import {
  LOAD_USER_JOIN_GROUPS_REQUEST,
  LOAD_USER_CREATED_GROUPS_REQUEST,
  UPLOAD_MODIFY_GROUP_IMAGE_REQUEST,
  REMOVE_GROUP_IMAGE,
  MODIFY_GROUP_INFO_REQUEST
} from "../../reducers/user";
import Lnb from "../../components/MypageLnb";
import Helmet from "react-helmet";
import moment from "moment";

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
  dl {
    margin-top: 16px;
  }
  dl > dt {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 7px;
  }
  dl > dd + dt {
    margin-top: 25px;
  }
`;
const PaginationWrap = styled.div`
  margin-top: 25px;
  text-align: center;
`;
const ModifyButton = styled.button`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

const Manage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { createGroupList, joinGroupList, groupImages } = useSelector(
    state => state.user
  );
  const [activePage, setActivePage] = useState(1);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const pageLimit = 5; // 페이지에 보여줄 게시글 최대 수

  useEffect(() => {
    dispatch({
      type: LOAD_USER_JOIN_GROUPS_REQUEST,
      limit: pageLimit
    });
    dispatch({
      type: LOAD_USER_CREATED_GROUPS_REQUEST,
      limit: pageLimit
    });
  }, []);

  // [가입한 모임] 페이징 버튼을 눌렀을 경우
  const handleJoinPageChange = useCallback(pageNumber => {
    setActivePage(pageNumber);

    let offset = 0;
    if (pageNumber > 1) {
      offset = pageLimit * (pageNumber - 1);
    }

    dispatch({
      type: LOAD_USER_JOIN_GROUPS_REQUEST,
      limit: pageLimit,
      offset: offset,
      page: pageNumber
    });
  }, []);

  // [생성한 모임] 페이징 버튼을 눌렀을 경우
  const handleCreatedPageChange = useCallback(pageNumber => {
    setActivePage(pageNumber);

    let offset = 0;
    if (pageNumber > 1) {
      offset = pageLimit * (pageNumber - 1);
    }

    dispatch({
      type: LOAD_USER_CREATED_GROUPS_REQUEST,
      limit: pageLimit,
      offset: offset,
      page: pageNumber
    });
  }, []);

  // 모임 수정 버튼을 눌렀을 경우
  const onSubmitModify = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: MODIFY_GROUP_INFO_REQUEST,
        data: {
          groupId: id,
          groupImage: groupImages[0],
          groupName: name,
          groupInfo: info
        }
      });
      setIsActivePopup(false);
    },
    [id, groupImages, name, info]
  );

  // 모임 수정 버튼을 눌렀을 경우
  const onShowModifyPopup = useCallback(
    e => {
      setIsActivePopup(true);
      const groupId = e.currentTarget.value;
      const group =
        createGroupList.rows &&
        createGroupList.rows.filter(v => v.id == groupId);
      setId(groupId);
      setName(group[0].groupName);
      setInfo(group[0].groupInfo && group[0].groupInfo);
      setThumbnail(group[0].groupImage && group[0].groupImage);
    },
    [createGroupList]
  );

  const onChangeName = useCallback(e => {
    setName(e.target.value);
  }, []);
  const onChangeInfo = useCallback(e => {
    setInfo(e.target.value);
  }, []);

  // 팝업 취소 버튼을 눌렀을 경우
  const onClosePopup = useCallback(() => {
    setIsActivePopup(false);
    dispatch({
      type: REMOVE_GROUP_IMAGE
    });
  }, []);

  // 대표이미지 변경 버튼 클릭시 input[file]을 연다.
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f);
    });
    console.log(imageFormData);
    dispatch({
      type: UPLOAD_MODIFY_GROUP_IMAGE_REQUEST,
      data: imageFormData
    });
  }, []);

  return (
    <Section
      <Helmet title="모임 관리 | Together" />
      <Lnb path={router.pathname} />
      <Content>
        <h3>모임관리</h3>
        <dl>
          <dt>내가 가입한 모임</dt>
          <dd>
            <table className="board_view">
              <colgroup>
                <col width="90" />
                <col width="" />
                <col width="100" />
                <col width="80" />
                <col width="90" />
                <col width="65" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">카테고리</th>
                  <th scope="col" className="title">
                    모임이름
                  </th>
                  <th scope="col">모임장</th>
                  <th scope="col">모임멤버</th>
                  <th scope="col">모임가입일</th>
                  <th scope="col">이동</th>
                </tr>
              </thead>
              <tbody>
                {joinGroupList.rows &&
                  joinGroupList.rows.map(group => (
                    <tr key={group.id}>
                      <td className="label">
                        <span>{group.groupCategory}</span>
                      </td>
                      <td className="title">{group.groupName}</td>
                      <td>{group.User && group.User.userNickname}</td>
                      <td>
                        {group.Members && Object.keys(group.Members).length + 1}
                        명
                      </td>
                      <td>
                        {group.Members &&
                          group.Members[0].Member &&
                          moment(group.Members[0].Member.createdAt).format(
                            "YYYY.MM.DD"
                          )}
                      </td>
                      <td>
                        <Link
                          href="/group/intro/[id]"
                          as={`/group/intro/${group.id}`}
                        >
                          <a target="_blank">
                            <FontAwesomeIcon icon={faLink} />
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationWrap>
              <Pagination
                // hideDisabled
                firstPageText="&laquo;"
                prevPageText="&lt;"
                nextPageText="&gt;"
                lastPageText="&raquo;"
                itemClass="page-item"
                activeClass="active-class"
                activePage={activePage}
                itemsCountPerPage={pageLimit} // 페이지당 항목 수
                totalItemsCount={joinGroupList.count} // 총 게시글 수
                pageRangeDisplayed={5} // 페이징 번호 블럭 수 ex) [1][2][3][4][5]
                onChange={handleJoinPageChange}
              />
            </PaginationWrap>
          </dd>
          <dt>내가 만든 모임</dt>
          <dd>
            <table className="board_view">
              <colgroup>
                <col width="90" />
                <col width="" />
                <col width="80" />
                <col width="100" />
                <col width="70" />
                <col width="65" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">카테고리</th>
                  <th scope="col" className="title">
                    모임이름
                  </th>
                  <th scope="col">모임멤버</th>
                  <th scope="col">모임시작일</th>
                  <th scope="col">수정</th>
                  <th scope="col">이동</th>
                </tr>
              </thead>
              <tbody>
                {createGroupList.rows &&
                  createGroupList.rows.map(group => (
                    <tr key={group.id}>
                      <td className="label">
                        <span>{group.groupCategory}</span>
                      </td>
                      <td className="title">{group.groupName}</td>
                      <td>
                        {group.Members && Object.keys(group.Members).length + 1}
                        명
                      </td>
                      <td>{moment(group.createdAt).format("YYYY.MM.DD")}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-default"
                          onClick={onShowModifyPopup}
                          value={group.id}
                        >
                          <FontAwesomeIcon icon={faCog} color="#0299dd" />
                        </button>
                      </td>
                      <td>
                        <Link
                          href="/group/intro/[id]"
                          as={`/group/intro/${group.id}`}
                        >
                          <a target="_blank">
                            <FontAwesomeIcon icon={faLink} />
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationWrap>
              <Pagination
                // hideDisabled
                firstPageText="&laquo;"
                prevPageText="&lt;"
                nextPageText="&gt;"
                lastPageText="&raquo;"
                itemClass="page-item"
                activeClass="active-class"
                activePage={activePage}
                itemsCountPerPage={pageLimit} // 페이지당 항목 수
                totalItemsCount={createGroupList.count} // 총 게시글 수
                pageRangeDisplayed={5} // 페이징 번호 블럭 수 ex) [1][2][3][4][5]
                onChange={handleCreatedPageChange}
              />
            </PaginationWrap>
          </dd>
        </dl>
      </Content>

      {isActivePopup && (
        <div className="popup_wrap">
          <div className="popup">
            <h1>모임 정보 수정</h1>
            <form onSubmit={onSubmitModify}>
              <div className="popup_content">
                <div className="input_area">
                  <label htmlFor="">대표이미지</label>
                  {groupImages.map(
                    (image, index) =>
                      index == 0 && (
                        <img
                          className="thumbnail"
                          src={`http://localhost:8080/${image}`}
                          alt={image}
                        />
                      )
                  )}
                  {groupImages.length == 0 && (
                    <>
                      <img
                        className="thumbnail"
                        src={
                          thumbnail
                            ? `http://localhost:8080/${thumbnail}`
                            : "http://localhost:3000/bg_default_large.gif"
                        }
                        alt={thumbnail}
                      />
                    </>
                  )}{" "}
                  <input
                    type="file"
                    multiple
                    hidden
                    ref={imageInput}
                    onChange={onChangeImages}
                  />
                  <ModifyButton
                    className="btn btn-dark"
                    type="button"
                    onClick={onClickImageUpload}
                  >
                    대표이미지 변경
                  </ModifyButton>
                </div>
                <div className="input_area">
                  <label htmlFor="">모임이름</label>
                  <input type="text" value={name} onChange={onChangeName} />
                </div>
                <div className="input_area">
                  <label htmlFor="">모임소개</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="10"
                    wrap="hard"
                    value={info}
                    onChange={onChangeInfo}
                  ></textarea>
                </div>
              </div>
              <div className="popup_buttons">
                <button type="button" onClick={onClosePopup}>
                  취소
                </button>
                <button type="submit">수정</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Manage;
