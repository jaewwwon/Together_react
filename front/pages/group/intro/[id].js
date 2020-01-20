import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GroupHead from "../../../components/GroupHead";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const Content = styled.div`
  font-size: 14px;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  h2 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 12px;
  }
`;
const Introduce = styled.div`
  float: left;
  width: 50%;
`;
const Member = styled.div`
  float: left;
  width: 50%;
  & > div {
    border: 1px solid #dedede;
    border-top-width: 5px;
    border-radius: 4px;
  }
  ul {
    max-height: 730px;
    overflow-y: auto;
  }
  ul > li {
    position: relative;
    padding: 10px 8px 10px 58px;
  }
  ul > li + li {
    border-top: 1px solid #dedede;
  }
  ul > li .label {
    position: relative;
    top: 1px;
    font-size: 13px;
    font-weight: 500;
    color: #009688;
  }
  ul > li > img {
    position: absolute;
    left: 7px;
    top: 8px;
    width: 42px;
    height: 42px;
    border: 1px solid #eee;
    border-radius: 50%;
    object-fit: cover;
  }
  ul > li > .user_name {
    font-weight: 500;
    font-size: 15px;
  }
  ul > li > .user_intro {
    margin-top: 3px;
  }
`;

const Intro = () => {
  const { groupDetail } = useSelector(state => state.group);

  return (
    <Container>
      <GroupHead />

      <Content>
        <Introduce>
          <h2>모임소개</h2>
          <pre>{groupDetail && groupDetail.groupInfo}</pre>
        </Introduce>
        <Member>
          <h2>모임멤버</h2>
          <div>
            <ul>
              {groupDetail && groupDetail.User && (
                <li>
                  <img
                    src={
                      groupDetail.User.userProfile
                        ? `http://localhost:8080/${groupDetail.User.userProfile}`
                        : "http://localhost:3000/icon_profile.png"
                    }
                    alt="사용자 프로필"
                  />
                  <p className="user_name">
                    {groupDetail.User.userNickname}{" "}
                    <span className="label">(모임장)</span>
                  </p>
                  <p className="user_intro">
                    {groupDetail.User.userIntro
                      ? groupDetail.User.userIntro
                      : "자기소개가 없습니다"}
                  </p>
                </li>
              )}
              {groupDetail &&
                groupDetail.Members &&
                groupDetail.Members.map((member, index) => (
                  <li key={member.id}>
                    <img
                      src={
                        member.userProfile
                          ? `http://localhost:8080/${member.userProfile}`
                          : "http://localhost:3000/icon_profile.png"
                      }
                      alt="사용자 프로필"
                    />
                    <p className="user_name">{member.userNickname}</p>
                    <p className="user_intro">
                      {member.userIntro
                        ? member.userIntro
                        : "자기소개가 없습니다"}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </Member>
      </Content>
    </Container>
  );
};

// Group.getInitialProps = async context => {
//   console.log(Object.keys(context));
// };

export default Intro;
