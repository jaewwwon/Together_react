import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_GROUP_INTRO_REQUEST,
  GROUP_MEMBER_JOIN_REQUEST,
  GROUP_MEMBER_LEAVE_REQUEST
} from "../reducers/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import Helmet from "react-helmet";

const GroupSummary = styled.div`
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;
const Image = styled.div`
  float: left;
  background: no-repeat 50% 50% / cover;
  background-image: ${props =>
    props.img
      ? `url(http://localhost:8080//${props.img})`
      : "url(http://localhost:3000/bg_default_large.gif)"};
  width: 50%;
  padding-top: 27%;
  border: 1px solid #eee;
  border-radius: 4px;
`;
const GroupInfo = styled.div`
  float: left;
  width: 50%;
  padding: 20px 3%;
`;
const Category = styled.span`
  display: inline-block;
  min-width: 48px;
  min-height: 22px;
  padding: 4px 8px;
  background: #673ab7;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  text-align: center;
`;
const Name = styled.p`
  margin: 12px 0 8px;
  font-size: 25px;
`;
const Info = styled.dl`
  font-size: 15px;
  line-height: 1.4;
  color: #555;
  & > dt {
    display: inline-block;
    margin-right: 4px;
  }
  & > dt > svg {
    width: 19px !important;
  }
  & > dd {
    display: inline;
  }
`;
const ButtonJoin = styled.button`
  margin-top: 25px;
  background: #03a9f4;
  border: 1px solid transparent;
  color: #fff;
  font-size: 15px;
  padding: 5px 12px;
  border-radius: 15px;
  box-shadow: 1px 2px 1px rgba(45, 64, 114, 0.2);
`;
const ButtonLeave = styled.button`
  margin-top: 25px;
  background: #828282;
  border: 1px solid transparent;
  color: #fff;
  font-size: 15px;
  padding: 5px 12px;
  border-radius: 15px;
  box-shadow: 1px 2px 1px rgba(45, 64, 114, 0.2);
`;
const Tab = styled.ul`
  margin-top: 32px;
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;

  & > li {
    display: inline-block;
    margin-bottom: -1px;
  }
  & > li > a {
    display: block;
    padding: 10px 20px;
  }
  & > li > a.active {
    border-bottom: 2px solid #009688;
  }
`;

const GroupHead = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupDetail } = useSelector(state => state.group);
  const { userInfo } = useSelector(state => state.user);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_GROUP_INTRO_REQUEST,
  //     data: router.query.id
  //   });
  // }, []);

  const onClickGroupJoin = useCallback(() => {
    dispatch({
      type: GROUP_MEMBER_JOIN_REQUEST,
      data: { groupId: router.query.id, userId: userInfo.id }
    });
  }, [userInfo]);

  const onClickGroupLeave = useCallback(() => {
    dispatch({
      type: GROUP_MEMBER_LEAVE_REQUEST,
      data: router.query.id
    });
  }, []);

  const joinState =
    userInfo &&
    groupDetail &&
    groupDetail.User &&
    groupDetail.Members &&
    groupDetail.Members.find(member => userInfo.id == member.id);

  return (
    <>
      <Helmet
        title={`groupDetail && groupDetail.groupName} | Together`}
        meta={[
          {
            property: "og:type",
            content: "website"
          },
          {
            name: "description",
            content:
              "같은 관심사를 함께하는 즐거움! 공통 관심사를 갖고 있는 사람들을 쉽고 빠르게 찾아보세요."
          },
          {
            name: "og:title",
            content: `${groupDetail && groupDetail.groupName} | Together`
          },
          {
            name: "og:description",
            content: groupDetail && groupDetail.groupInfo
          },
          {
            name: "og:image",
            content:
              groupDetail && groupDetail.groupImage
                ? `http://localhost:8080/${groupDetail.groupImage}`
                : "http://localhost:3000/bg_default_large.gif"
          },
          {
            name: "og:url",
            content:
              groupDetail &&
              `http://localhost:3000/group/intro/${groupDetail.id}`
          }
        ]}
      />
      <GroupSummary>
        <Image img={groupDetail && groupDetail.groupImage} />
        <GroupInfo>
          <Category>{groupDetail && groupDetail.groupCategory}</Category>
          <Name>{groupDetail && groupDetail.groupName}</Name>
          <Info>
            <dt>
              <FontAwesomeIcon icon={faUserTie} /> 모임장:
            </dt>
            <dd>
              {groupDetail && groupDetail.User && groupDetail.User.userNickname}
            </dd>
          </Info>
          <Info>
            <dt>
              <FontAwesomeIcon icon={faUsers} /> 모임멤버:
            </dt>
            <dd>
              {groupDetail && groupDetail.Members
                ? groupDetail.Members.length + 1
                : "1"}
              명
            </dd>
          </Info>
          {userInfo &&
            groupDetail &&
            groupDetail.User &&
            groupDetail.User.id != userInfo.id &&
            !joinState && (
              <ButtonJoin onClick={onClickGroupJoin}>가입하기</ButtonJoin>
            )}
          {joinState && (
            <ButtonLeave onClick={onClickGroupLeave}>탈퇴하기</ButtonLeave>
          )}
        </GroupInfo>
      </GroupSummary>
      <Tab>
        <li>
          <Link href="/group/intro/[id]" as={`/group/intro/${router.query.id}`}>
            <a
              className={
                router.pathname == "/group/intro/[id]" ? "active" : "link"
              }
            >
              소개
            </a>
          </Link>
        </li>
        <li>
          <Link
            href="/group/schedule/[id]"
            as={`/group/schedule/${router.query.id}`}
          >
            <a
              className={
                router.pathname == "/group/schedule/[id]" ? "active" : "link"
              }
            >
              일정
            </a>
          </Link>
        </li>
        <li>
          <Link href="/group/board/[id]" as={`/group/board/${router.query.id}`}>
            <a
              className={
                router.pathname == "/group/board/[id]" ? "active" : "link"
              }
            >
              게시판
            </a>
          </Link>
        </li>
        <li>
          <Link
            href="/group/gallery/[id]"
            as={`/group/gallery/${router.query.id}`}
          >
            <a
              className={
                router.pathname == "/group/gallery/[id]" ? "active" : "link"
              }
            >
              사진첩
            </a>
          </Link>
        </li>
      </Tab>
    </>
  );
};

export default GroupHead;
