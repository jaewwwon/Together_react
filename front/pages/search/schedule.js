import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SEARCH_SCHEDULES_REQUEST } from "../../reducers/group";
import ScheduleItem from "../../components/ScheduleItem";
import Helmet from "react-helmet";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;
const SearchFrom = styled.div`
  position: relative;
  padding: 85px 0;
  background: url("http://localhost:3000/bg_main.jpg") no-repeat 0 0 / cover;
  text-align: center;
  font-size: 15px;
  h2 {
    margin-bottom: 16px;
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    text-shadow: 0px 3px 3px rgba(45, 64, 114, 0.2);
  }
  select,
  input[type="text"],
  button {
    height: 42px;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  select {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  input[type="text"] {
    width: 250px;
    border-left: 0;
    border-right: 0;
  }
  button {
    padding: 0 15px;
    background: #555;
    border-color: transparent;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #fff;
    transition: 0.15s ease-in-out;
  }
  button:hover {
    background: #333;
  }
`;
const SearchList = styled.ul`
  margin: 45px 0;
  & > li + li {
    margin-top: 8px;
  }
`;
const SearchResult = styled.p`
  padding: 55px 0;
  font-weight: 500;
  text-align: center;
`;

const SearchSchdules = () => {
  const dispatch = useDispatch();
  const { searchSchedules, hasMoreItem } = useSelector(state => state.group);
  const [groupCategory, setGroupCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [searchSchedules.length]);

  const onScroll = useCallback(() => {
    // 현재 스크롤 위치(상단기준), 화면 높이, 페이지 전체 높이
    // console.log(
    //   window.scrollY,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight
    // );
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (searchSchedules[0] && hasMoreItem) {
        dispatch({
          type: LOAD_SEARCH_SCHEDULES_REQUEST,
          lastDate: searchSchedules[searchSchedules.length - 1].date,
          data: {
            category: groupCategory,
            keyword
          }
        });
      }
    }
  }, [searchSchedules.length, hasMoreItem, groupCategory, keyword]);

  const onSumitSearch = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOAD_SEARCH_SCHEDULES_REQUEST,
        data: {
          category: groupCategory,
          keyword
        }
      });
    },
    [groupCategory, keyword]
  );

  const onChangeCategory = useCallback(e => {
    setGroupCategory(e.target.value);
  }, []);

  const onChangeKeyword = useCallback(e => {
    setKeyword(e.target.value);
  }, []);

  return (
    <>
      <Helmet itle="일정 검색 | Together" />
      <SearchFrom>
        <Container>
          <h2>곧 진행될 일정을 확인해보세요.</h2>
          <form onSubmit={onSumitSearch}>
            <select
              id="groupCategory"
              value={groupCategory}
              onChange={onChangeCategory}
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
            <input
              type="text"
              value={keyword}
              onChange={onChangeKeyword}
              placeholder="일정명 또는 일정내용을 입력하세요"
            />
            <button type="submit">검색 </button>
          </form>
        </Container>
      </SearchFrom>
      <Container>
        <SearchList>
          {searchSchedules.length > 0 &&
            searchSchedules.map(schedule => {
              return (
                <li key={schedule.id}>
                  <ScheduleItem schedule={schedule} />
                </li>
              );
            })}
        </SearchList>
        {searchSchedules.length === 0 && (
          <SearchResult>검색 결과가 없습니다.</SearchResult>
        )}
      </Container>
    </>
  );
};

SearchSchdules.getInitialProps = async context => {
  // console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_SEARCH_SCHEDULES_REQUEST
  });
};

export default SearchSchdules;
