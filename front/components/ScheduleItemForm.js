import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  MODIFY_GROUP_SCHEDULE_REQUEST,
  REMOVE_GROUP_SCHEDULE_REQUEST,
  ATTEND_GROUP_SCHEDULE_REQUEST,
  ABSENT_GROUP_SCHEDULE_REQUEST
} from "../reducers/group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Container = styled.div`
  position: relative;
  margin-top: 15px;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(45, 64, 114, 0.2);
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
  & > p:first-child {
    color: #f64060;
  }
  & > p:nth-child(2) {
    margin-top: 10px;
    font-size: 19px;
    font-weight: 500;
  }
  & > p:nth-child(3) {
    margin-top: 5px;
    font-size: 16px;
  }
  & > p:nth-child(4) {
  }
`;
const AttendInfo = styled.div`
  position: relative;
  margin-top: 10px;
  color: #666;
  & > p + p {
    margin-top: 4px;
  }
  & > button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .btn-default {
    color: #666;
  }
  .btn-default:hover {
    color: #666;
    text-decoration: underline;
  }
`;
const CloseButton = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
`;
const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 7px;
  & > button {
    padding: 0px 12px;
    background: transparent;
    border: 0;
    font-size: 18px;
  }
  .dropdown_menu {
    position: absolute;
    top: 100%;
    right: 0px;
    margin-top: 7px;
    padding: 6px 0;
    background-color: #fff;
    border: 1px solid rgba(46, 62, 72, 0.12);
    border-radius: 4%;
    box-shadow: 0 2px 2px 0 rgba(46, 62, 72, 0.12),
      0 3px 1px -2px rgba(46, 62, 72, 0.26), 0 1px 5px 0 rgba(46, 62, 72, 0.12);
    box-sizing: border-box;
  }
  .dropdown_menu:after,
  .dropdown_menu:before {
    content: "";
    z-index: 11;
    position: absolute;
  }
  .dropdown_menu:after {
    top: -9px;
    right: 9px;
    width: 0;
    height: 0;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
  .dropdown_menu:before {
    top: -10.5px;
    right: 8px;
    width: 0;
    height: 0;
    border-bottom: 11px solid rgba(46, 62, 72, 0.12);
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
  }
  .dropdown_menu > li > button {
    min-width: 72px;
    padding: 2px 0;
    background: transparent;
    border: 0;
    font-size: 14px;
    color: #333;
  }
  .dropdown_menu > li > button svg {
    min-width: 14px;
    font-size: 12px;
    vertical-align: initial;
  }
`;
const MemberList = styled.ul`
  display: block;
  li {
    position: relative;
    min-height: 54px;
    padding: 8px 0 8px 42px;
  }
  li + li {
    border-top: 1px solid #ddd;
  }
  li img {
    position: absolute;
    top: 8px;
    left: 0;
    width: 36px;
    height: 36px;
    border: 1px solid #eee;
    border-radius: 50%;
    object-fit: cover;
  }
  .name {
    font-weight: 500;
    font-size: 15px;
  }
  .name .label {
    position: relative;
    top: 1px;
    margin-left: 3px;
    font-size: 13px;
    font-weight: 500;
    color: #009688;
  }
  .intro {
    margin-top: 3px;
    font-size: 14px;
  }
`;
const Notice = styled.p`
  padding: 20px 0;
  font-size: 15px;
  text-align: center;
`;

const ScheduleItemFrom = ({ schedule }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const { groupDetail, scheduleList } = useSelector(state => state.group);
  const [startDate, setStartDate] = useState(new Date(schedule.date));
  const [title, setTitle] = useState(schedule.title);
  const [content, setContent] = useState(schedule.content);
  const [location, setLocation] = useState(schedule.location);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [isMemberPopup, setIsMemberPopup] = useState(false);
  const [isDropMenu, setIsDropMenu] = useState(false);
  const menu = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isDropMenu]);

  const onClickOutside = useCallback(e => {
    if (menu.current && !menu.current.contains(e.target)) {
      setIsDropMenu(false);
    }
  }, []);

  // 일정 수정버튼을 눌럿을 경우
  const onSchedulePopup = useCallback(() => {
    setIsActivePopup(true);
  }, []);

  const onClosePopup = useCallback(() => {
    setTitle(schedule.title);
    setContent(schedule.content);
    setStartDate(new Date(schedule.date));
    setLocation(schedule.location);
    setIsDropMenu(false);
    setIsActivePopup(false);
    setIsMemberPopup(false);
  }, []);

  // 일정 수정버튼을 눌렀을 경우
  const onSubmitSchedule = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: MODIFY_GROUP_SCHEDULE_REQUEST,
        data: {
          title,
          content,
          date: startDate,
          location,
          scheduleId: schedule.id
        }
      });
      setIsDropMenu(false);
      setIsActivePopup(false);
    },
    [title, content, startDate, location]
  );

  // 일정 삭제버튼을 눌렀을 경우
  const onRemoveSchedule = useCallback(e => {
    e.preventDefault();
    setIsDropMenu(false);
    if (confirm("해당 일정을 삭제 하시겠습니까?")) {
      dispatch({
        type: REMOVE_GROUP_SCHEDULE_REQUEST,
        data: e.target.value
      });
    }
  }, []);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback(e => {
    setContent(e.target.value);
  }, []);

  const onChangeLocation = useCallback(e => {
    setLocation(e.target.value);
  }, []);

  // 일정 참석 버튼을 눌렀을 경우
  const onClickAttend = useCallback(e => {
    dispatch({
      type: ATTEND_GROUP_SCHEDULE_REQUEST,
      data: e.target.value
    });
  }, []);

  // 일정 참석 취소 버튼을 눌렀을 경우
  const onClickAbsent = useCallback(e => {
    dispatch({
      type: ABSENT_GROUP_SCHEDULE_REQUEST,
      data: e.target.value
    });
  }, []);

  const onDropDownMenu = useCallback(() => {
    setIsDropMenu(!isDropMenu);
  }, [isDropMenu]);

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

  // 멤버 조건 식별
  const memberState =
    (userInfo &&
      groupDetail &&
      groupDetail.User &&
      groupDetail.Members &&
      groupDetail.Members.find(member => userInfo.id == member.id)) ||
    (userInfo &&
      groupDetail &&
      groupDetail.User &&
      groupDetail.User.id === userInfo.id);

  // 일정 참석 멤버 팝업창 열기
  const onMemberPopup = useCallback(e => {
    setIsMemberPopup(true);
  }, []);

  return (
    <Container key={schedule.id}>
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
        <p>
          {moment.locale("en") &&
            moment(schedule.date).format("YYYY.MM.DD A hh:mm")}
        </p>
        <p>{schedule.title}</p>
        <p>{schedule.content}</p>
        <AttendInfo>
          <p>장소: {schedule.location}</p>
          <p>
            <button
              type="button"
              className="btn-default"
              onClick={onMemberPopup}
            >
              참여인원: {schedule.Attends && schedule.Attends.length}명
            </button>
          </p>
          {memberState ? (
            dayCounter(schedule.date) !== "종료" ? (
              schedule.Attends.findIndex(v => v.id == userInfo.id) === -1 ? (
                <button
                  className="btn btn-hover normal"
                  type="button"
                  value={schedule.id}
                  onClick={onClickAttend}
                >
                  참석
                </button>
              ) : (
                <button
                  className="btn btn-hover normal"
                  type="button"
                  value={schedule.id}
                  onClick={onClickAbsent}
                >
                  참석취소
                </button>
              )
            ) : (
              <CloseButton className="btn btn-dark">마감</CloseButton>
            )
          ) : null}
        </AttendInfo>
      </Content>

      {groupDetail.User && userInfo.id === groupDetail.User.id && (
        <ButtonWrap>
          <button type="button" onClick={onDropDownMenu}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
          {isDropMenu && (
            <ul className="dropdown_menu" ref={menu}>
              <li>
                <button type="button" onClick={onSchedulePopup}>
                  <FontAwesomeIcon icon={faEdit} /> 수정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  value={schedule.id}
                  onClick={onRemoveSchedule}
                >
                  <FontAwesomeIcon icon={faTrash} /> 삭제
                </button>
              </li>
            </ul>
          )}
        </ButtonWrap>
      )}

      {isActivePopup && (
        <div className="popup_wrap">
          <div className="popup">
            <h1>일정 수정</h1>
            <form onSubmit={onSubmitSchedule}>
              <div className="popup_content">
                <div className="input_area">
                  <label htmlFor="title">제목</label>
                  <input
                    id="title"
                    value={title}
                    onChange={onChangeTitle}
                    type="text"
                    required
                  />
                </div>
                <div className="input_area">
                  <label htmlFor="content">내용</label>
                  <input
                    id="content"
                    value={content}
                    onChange={onChangeContent}
                    type="text"
                    required
                  />
                </div>
                <div className="input_area">
                  <label htmlFor="">시간</label>
                  <DatePicker
                    showTimeSelect
                    dateFormat="yyyy년 MM월 dd일 aa hh:mm"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </div>
                <div className="input_area">
                  <label htmlFor="location">장소</label>
                  <input
                    id="location"
                    value={location}
                    onChange={onChangeLocation}
                    type="text"
                    required
                  />
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

      {isMemberPopup && (
        <div className="popup_wrap">
          <div className="popup">
            <h1>일정 참여 멤버</h1>
            <form onSubmit={onSubmitSchedule}>
              <div className="popup_content">
                <MemberList>
                  {schedule.Attends.map(member => (
                    <li key={member.id}>
                      <img
                        src={
                          member.userProfile
                            ? `http://localhost:8080/${member.userProfile}`
                            : "http://localhost:3000/icon_profile.png"
                        }
                        alt="프로필 사진"
                      />
                      <p className="name">
                        {member.userNickname}
                        {member.id === groupDetail.id && (
                          <span className="label">(모임장)</span>
                        )}
                      </p>
                      <p className="intro">{member.userIntro}</p>
                    </li>
                  ))}
                </MemberList>
                {schedule.Attends.length === 0 && (
                  <Notice>일정에 참석하는 멤버가 없습니다.</Notice>
                )}
              </div>
              <div className="popup_buttons">
                <button type="button" onClick={onClosePopup}>
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ScheduleItemFrom;
