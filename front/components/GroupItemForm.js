import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
  padding: 5px;
  & > a {
    position: relative;
    display: block;
    box-shadow: 0 0 2px 0 rgba(46, 62, 72, 0.12),
      0 2px 4px 0 rgba(46, 62, 72, 0.12);
    border-radius: 25px;
    font-size: 14px;
    transition: all 0.15s ease-in-out;
    overflow: hidden;
    padding-top: 185px;
  }
`;
const Thumbnail = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 185px;
  object-fit: cover;
`;
const Content = styled.div`
  padding: 25px 15px 25px;
  border-top: 1px solid #ddd;
  .category {
    display: inline-block;
    min-width: 48px;
    min-height: 22px;
    padding: 4px 8px;
    background: #673ab7;
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
  .name {
    margin-top: 10px;
    font-size: 19px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info {
    height: 48px;
    margin-top: 4px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .member {
    margin-top: 4px;
    color: #666;
  }
`;

const GroupItemForm = ({ group }) => {
  return (
    <Wrap>
      <Link href="/group/intro/[id]" as={`/group/intro/${group.id}`}>
        <a>
          <Thumbnail
            src={
              group.groupImage
                ? `http://localhost:8080/${group.groupImage}`
                : "http://localhost:3000/bg_default_small.gif"
            }
            alt={group.groupName}
          />
          <Content>
            <p className="category">{group.groupCategory}</p>
            <p className="name">{group.groupName}</p>
            <p className="info">{group.groupInfo}</p>
            <p className="member">
              모임멤버: {group.Members && Object.keys(group.Members).length + 1}
              명
            </p>
          </Content>
        </a>
      </Link>
    </Wrap>
  );
};
export default GroupItemForm;
