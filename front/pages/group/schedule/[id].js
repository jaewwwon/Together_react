import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GroupHead from "../../../components/GroupHead";
import ScheduleItemForm from "../../../components/ScheduleItemForm";
import {
  LOAD_GROUP_SCHEDULE_REQUEST,
  CREATE_GROUP_SCHEDULE_REQUEST
} from "../../../reducers/group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const ButtonWrap = styled.div`
  text-align: right;
`;

const Schedule = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const { groupDetail, scheduleList, hasMoreItem } = useSelector(
    state => state.group
  );
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [isActiveCreatePopup, setIsActiveCreatePopup] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scheduleList.length]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (scheduleList[0] && hasMoreItem) {
        dispatch({
          type: LOAD_GROUP_SCHEDULE_REQUEST,
          data: router.query.id,
          lastDate: scheduleList[scheduleList.length - 1].date
        });
      }
    }
  }, [scheduleList.length, hasMoreItem]);

  const onSchedulePopup = useCallback(() => {
    setIsActiveCreatePopup(true);
  }, []);

  const onClosePopup = useCallback(() => {
    setTitle("");
    setContent("");
    setStartDate(new Date());
    setLocation("");
    setIsActiveCreatePopup(false);
  }, []);

  // 일정 등록버튼을 눌렀을 경우
  const onSubmitSchedule = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: CREATE_GROUP_SCHEDULE_REQUEST,
        data: {
          title,
          content,
          date: startDate,
          location,
          groupId: router.query.id
        }
      });
      setTitle("");
      setContent("");
      setStartDate(new Date());
      setLocation("");
      setIsActiveCreatePopup(false);
    },
    [title, content, startDate, location]
  );

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback(e => {
    setContent(e.target.value);
  }, []);

  const onChangeLocation = useCallback(e => {
    setLocation(e.target.value);
  }, []);

  return (
    <Container>
      <GroupHead />
      {groupDetail && groupDetail.User && userInfo.id === groupDetail.User.id && (
        <ButtonWrap>
          <button
            className="btn btn-radius"
            type="button"
            onClick={onSchedulePopup}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
            일정 등록
          </button>
        </ButtonWrap>
      )}

      <ol>
        {scheduleList &&
          scheduleList.map(schedule => (
            <ScheduleItemForm key={schedule.id} schedule={schedule} />
          ))}
      </ol>

      {isActiveCreatePopup && (
        <div className="popup_wrap">
          <div className="popup">
            <h1>일정 등록</h1>
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
                <button type="submit">등록</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

Schedule.getInitialProps = async context => {
  // console.log(Object.keys(context));
  context.store.dispatch(
    {
      type: LOAD_GROUP_SCHEDULE_REQUEST,
      data: context.query.id
    },
    []
  );
};

export default Schedule;
