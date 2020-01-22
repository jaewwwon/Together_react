import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import GroupHead from "../../../components/GroupHead";
import { LOAD_BOARD_LIST_REQUEST } from "../../../reducers/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const SearchFrom = styled.div`
  position: relative;
  form {
    padding-right: 87px;
  }
  form > * {
    height: 34px;
    font-size: 14px;
  }
  form > select {
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    width: 92px;
    padding: 0 8px;
  }
  form > input[type="text"] {
    border: 1px solid #ccc;
    border-left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0 8px;
  }
  form > button {
    margin-left: 4px;
  }
  form + a {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const TableWrap = styled.div`
  margin-top: 24px;
`;
const PaginationWrap = styled.div`
  margin-top: 25px;
  text-align: center;
`;
const MemberNotice = styled.div`
  padding: 3em 0;
  text-align: center;
`;

const Board = () => {
  const router = useRouter();
  const id = useSelector(
    state => state.user.userInfo && state.user.userInfo.id
  );
  const { groupDetail, boardList, boardPage } = useSelector(
    state => state.group
  );
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();

  const MemberState =
    (groupDetail &&
      groupDetail.Members &&
      groupDetail.Members.find(member => id == member.id)) ||
    (groupDetail && groupDetail.User && groupDetail.User.id == id);

  // if (!MemberState) {
  //   alert("모임 멤버만 이용가능합니다.");
  //   Router.push(`/group/intro/${router.query.id}`);
  //   return null;
  // }

  const pageLimit = 10; // 페이지에 보여줄 게시글 최대 수

  useEffect(() => {
    dispatch({
      type: LOAD_BOARD_LIST_REQUEST,
      data: { groupId: router.query.id },
      limit: pageLimit
    });
  }, []);

  // 페이징 버튼을 눌렀을 경우
  const handlePageChange = useCallback(pageNumber => {
    setActivePage(pageNumber);

    let offset = 0;
    if (pageNumber > 1) {
      offset = pageLimit * (pageNumber - 1);
    }

    dispatch({
      type: LOAD_BOARD_LIST_REQUEST,
      data: { groupId: router.query.id },
      limit: pageLimit,
      offset: offset,
      page: pageNumber
    });
  }, []);

  // 검색버튼을 눌렀을 경우
  const onSubmitSearch = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOAD_BOARD_LIST_REQUEST,
        data: { groupId: router.query.id, category, keyword },
        limit: pageLimit
      });
    },
    [category, keyword]
  );

  const onChangeCategory = useCallback(e => {
    setCategory(e.target.value);
  }, []);

  const onChangeKeyword = useCallback(e => {
    setKeyword(e.target.value);
  }, []);

  return (
    <Container>
      <GroupHead />
      {MemberState ? (
        <>
          <SearchFrom>
            <form onSubmit={onSubmitSearch}>
              <select
                name=""
                id="category"
                value={category}
                onChange={onChangeCategory}
              >
                <option value="all">전체</option>
                <option value="공지사항">공지사항</option>
                <option value="가입인사">가입인사</option>
                <option value="자유글">자유글</option>
                <option value="건의사항">건의사항</option>
              </select>
              <input type="text" value={keyword} onChange={onChangeKeyword} />
              <button type="submit" className="btn btn-dark">
                검색
              </button>
            </form>

            <Link
              href="/group/boardWrite/[id]"
              as={`/group/boardWrite/${router.query.id}`}
            >
              <a className="btn btn-radius">
                <FontAwesomeIcon icon={faPencilAlt} />
                글작성
              </a>
            </Link>
          </SearchFrom>
          <TableWrap>
            <table className="board_view">
              <colgroup>
                <col width="60" />
                <col width="100" />
                <col width="" />
                <col width="80" />
                <col width="120" />
              </colgroup>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>말머리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {boardList.rows &&
                  boardList.rows.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {boardPage
                          ? boardList.count -
                            (boardPage - 1) * pageLimit -
                            index
                          : boardList.count - index}
                      </td>
                      <td>{item.category}</td>
                      <td className="title">
                        <Link
                          href="/group/boardView/[id]"
                          as={`/group/boardView/${item.id}`}
                        >
                          <a>{item.title}</a>
                        </Link>
                      </td>
                      <td>{item.User.userNickname}</td>
                      <td>
                        {moment(item.createdAt).format("YYYY.MM.DD") ===
                        moment().format("YYYY.MM.DD")
                          ? moment(item.createdAt).format("HH:mm")
                          : moment(item.createdAt).format("YYYY.MM.DD")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TableWrap>
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
              totalItemsCount={boardList.count} // 총 게시글 수
              pageRangeDisplayed={5} // 페이징 번호 블럭 수 ex) [1][2][3][4][5]
              onChange={handlePageChange}
            />
          </PaginationWrap>
        </>
      ) : (
        <MemberNotice>모임 멤버만 이용가능합니다.</MemberNotice>
      )}
    </Container>
  );
};

Board.getInitialProps = async context => {
  // console.log(Object.keys(context));
  // const state = context.store.getState();
};

export default Board;
