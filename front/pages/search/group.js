import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SEARCH_GROUPS_REQUEST } from "../../reducers/group";
import GroupItemForm from "../../components/GroupItemForm";
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
const GroupList = styled.ul`
  margin: 45px 0;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  & > li {
    float: left;
    width: 24%;
    margin: 0 0.5%;
  }
`;
const SearchResult = styled.p`
  padding: 55px 0;
  font-weight: 500;
  text-align: center;
`;

const SearchGroups = () => {
  const dispatch = useDispatch();
  const { searchGroups, hasMoreItem } = useSelector(state => state.group);
  const [groupCategory, setGroupCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [searchGroups.length]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (searchGroups[0] && hasMoreItem) {
        dispatch({
          type: LOAD_SEARCH_GROUPS_REQUEST,
          lastId: searchGroups[searchGroups.length - 1].id,
          data: {
            category: groupCategory,
            keyword
          }
        });
      }
    }
  }, [searchGroups.length, hasMoreItem, groupCategory, keyword]);

  const onSumitSearch = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOAD_SEARCH_GROUPS_REQUEST,
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
      <Helmet itle="모임 검색 | Together" />
      <SearchFrom>
        <Container>
          <h2>나와 같은 관심사를 갖고있는 모임을 찾아보세요.</h2>
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
              placeholder="검색어를 입력하세요."
            />
            <button type="submit">검색 </button>
          </form>
        </Container>
      </SearchFrom>
      <Container>
        <GroupList>
          {searchGroups.length > 0 &&
            searchGroups.map(group => {
              return (
                <li key={group.id}>
                  <GroupItemForm group={group} />
                </li>
              );
            })}
        </GroupList>
        {searchGroups.length === 0 && (
          <SearchResult>검색 결과가 없습니다.</SearchResult>
        )}
      </Container>
    </>
  );
};

SearchGroups.getInitialProps = async context => {
  // console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_SEARCH_GROUPS_REQUEST
  });
};

export default SearchGroups;
