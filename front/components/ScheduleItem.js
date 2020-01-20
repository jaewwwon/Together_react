import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

// moment.locale("ko");

const Container = styled.div`
  padding: 5px;
  & > a {
    position: relative;
    display: block;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(45, 64, 114, 0.2);
  }
`;
const DdayIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 16px;
  border-radius: 4px;
  background: #fff;
  text-align: center;
  & > p:first-child {
    padding: 5px 12px;
    background: #009688;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 13px;
    font-weight: 300;
    color: #fff;
  }
  & > p:last-child {
    padding: 14px 0;
    font-size: 17px;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
const Content = styled.div`
  padding: 15px 0 15px 12px;
  margin: 0 15px 0 83px;
  border-left: 1px solid #eee;
  font-size: 14px;
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
  .date {
    margin-left: 7px;
    color: #f64060;
    line-height: 20px;
  }
  .title {
    margin-top: 10px;
    font-size: 19px;
    font-weight: 500;
    height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .content {
    margin-top: 5px;
    font-size: 16px;
    height: 19px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
const AttendInfo = styled.div`
  position: relative;
  margin-top: 10px;
  color: #666;
  & > p:first-child {
    height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  & > p + p {
    margin-top: 4px;
  }
`;

const ScheduleItem = ({ schedule }) => {
  const [startDate, setStartDate] = useState(new Date(schedule.date));
  const [title, setTitle] = useState(schedule.title);
  const [content, setContent] = useState(schedule.content);
  const [location, setLocation] = useState(schedule.location);

  // 오늘 날짜를 기준으로 일정 D-day 계산
  const dayCounter = date => {
    const today = new Date();
    const then = new Date(date);
    let gapDate = then.getTime() - today.getTime();
    const gapDay = Math.floor(gapDate / (1000 * 60 * 60 * 24));
    if (gapDay > 0) {
      return `D-${gapDay}`;
    } else if (gapDay === 0) {
      return "오늘";
    } else {
      return "종료";
    }
  };

  return (
    <Container key={schedule.id}>
      <Link
        href="/group/schedule/[id]"
        as={`/group/schedule/${schedule.GroupId}`}
      >
        <a>
          <style jsx>{`
            .end {
              background: #4c4c4c !important;
            }
          `}</style>
          <DdayIcon>
            <p className={dayCounter(schedule.date) == "종료" && "end"}>
              {moment.locale("ko") && moment(schedule.date).format("dddd")}
            </p>
            <p>{dayCounter(schedule.date)}</p>
          </DdayIcon>
          <Content>
            <span className="category">
              {schedule.Group && schedule.Group.groupCategory}
            </span>
            <span className="date">
              {moment.locale("en") &&
                moment(schedule.date).format("YYYY.MM.DD A hh:mm")}
            </span>
            <p className="title">{schedule.title}</p>
            <p className="content">{schedule.content}</p>
            <AttendInfo>
              <p>장소: {schedule.location}</p>
              <p>참여인원: {schedule.Attends && schedule.Attends.length}명</p>
            </AttendInfo>
          </Content>
        </a>
      </Link>
    </Container>
  );
};

export default ScheduleItem;
