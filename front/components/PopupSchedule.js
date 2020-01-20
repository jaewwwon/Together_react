import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_SCHDULE_POPUP } from "../reducers/group";
import DatePicker from "react-datepicker";

const PopupWrap = styled.div`
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
`;
const Popup = styled.div`
  position: absolute;
  left: 50%;
  top: 50px;
  width: 90%;
  max-width: 420px;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 5px 5px rgba(45, 64, 114, 0.5);

  & > h1 {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }
`;
const PopupContent = styled.div`
  padding: 15px 10px;
  & > div + div {
    margin-top: 10px;
  }
  & > div > label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
  }
  & > div input[type="text"],
  & > div > select {
    padding: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 34px;
    font-size: 14px;
  }
  & > div input[type="text"] {
    width: 100%;
  }
`;
const PopupBottom = styled.div`
  padding: 15px 0 20px;
  border-top: 1px solid #ccc;
  text-align: center;
  & > button {
    display: inline-block;
    margin: 0 30px;
    background: none;
    border: 0;
    font-size: 14px;
  }
  & > button + button {
    color: #2196f3;
  }
`;

const PopupSchedule = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { schedulePopupState } = useSelector(state => state.group);
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [location, setLocation] = useState(data.location);

  const onClosePopup = useCallback(() => {
    dispatch({
      type: HIDE_SCHDULE_POPUP
    });
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
    <>
      {schedulePopupState && (
        <PopupWrap>
          <Popup>
            <h1>일정 수정</h1>
            <form onSubmit={onSubmitSchedule}>
              <PopupContent>
                <div>
                  <label htmlFor="title">제목</label>
                  <input
                    id="title"
                    value={title}
                    onChange={onChangeTitle}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content">내용</label>
                  <input
                    id="content"
                    value={content}
                    onChange={onChangeContent}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">시간</label>
                  <DatePicker
                    showTimeSelect
                    dateFormat="yyyy년 MM월 dd일 hh:mm aa"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </div>
                <div>
                  <label htmlFor="location">장소</label>
                  <input
                    id="location"
                    value={location}
                    onChange={onChangeLocation}
                    type="text"
                    required
                  />
                </div>
              </PopupContent>
              <PopupBottom>
                <button type="button" onClick={onClosePopup}>
                  취소
                </button>
                <button type="submit">등록</button>
              </PopupBottom>
            </form>
          </Popup>
        </PopupWrap>
      )}
    </>
  );
};

export default PopupSchedule;
