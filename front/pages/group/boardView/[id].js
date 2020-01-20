import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  LOAD_BOARD_DETAIL_REQUEST,
  CREATE_BOARD_COMMENT_REQUEST,
  REMOVE_BOARD_COMMENT_REQUEST,
  BOARD_REMOVE_REQUEST
} from "../../../reducers/group";
import CommentForm from "../../../components/CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
`;
const BoardInfo = styled.div`
  padding: 10px 16px;
  border-top: 2px solid #ccc;
  border-bottom: 1px dashed #ccc;
  .title {
    font-weight: 500;
  }
  .info {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }
  .info span + span {
    position: relative;
    padding-left: 8px;
    margin-left: 5px;
  }
  .info span + span:after {
    content: "|";
    position: absolute;
    left: 0;
    top: 0;
    font-size: 11px;
    line-height: 20px;
    color: #ccc;
  }
`;
const BoardContent = styled.div`
  padding: 25px 16px;
`;
const CommentWrap = styled.div`
  margin-top: 25px;
  .count {
    padding: 10px 16px;
    font-size: 15px;
    font-weight: 500;
  }
  .count span {
    color: #e74337;
  }
  & > form {
    padding: 15px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    text-align: right;
  }
  & > form textarea {
    width: 100%;
    min-height: 72px;
    margin-bottom: 12px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
`;
const Comment = styled.ol`
  & > li {
    position: relative;
    min-height: 48px;
    margin-top: 15px;
    padding-left: 58px;
  }
  & > li > ol > li {
    position: relative;
    min-height: 48px;
    margin-top: 15px;
    padding-left: 58px;
  }
`;
const ButtonWrap = styled.div`
  margin-bottom: 12px;
  text-align: right;
  .btn {
    font-size: 13px;
    padding: 4px 10px;
  }
  .btn + .btn {
    margin-left: 5px;
  }
`;

const BoardView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    boardInfo,
    boardInfo: { Comments: comments }
  } = useSelector(state => state.group);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // 게시글 정보 불러오기
    dispatch({
      type: LOAD_BOARD_DETAIL_REQUEST,
      data: router.query.id
    });
  }, []);

  // 댓글작성 버튼을 눌렀을 경우
  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: CREATE_BOARD_COMMENT_REQUEST,
        data: {
          boardId: router.query.id,
          comment,
          reply: 0
        }
      });
      // 댓글 입력란 초기화
      setComment("");
    },
    [comment]
  );

  const onChangeComment = useCallback(e => {
    setComment(e.target.value);
  }, []);

  const onBoardRemove = useCallback(() => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      dispatch({
        type: BOARD_REMOVE_REQUEST,
        data: router.query.id
      });
    } else {
      return;
    }
  }, []);

  // 날짜 포맷 변경
  const formatDate = value => {
    const today = new Date();
    let date = new Date(value),
      month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      todayMonth = "" + (today.getMonth() + 1),
      todayDay = "" + today.getDate(),
      todayYear = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (todayMonth.length < 2) todayMonth = "0" + todayMonth;
    if (todayDay.length < 2) todayDay = "0" + todayDay;
    if (minute.toString().length < 2) minute = "0" + minute;
    if (hour.toString().length < 2) hour = "0" + hour;

    const result =
      month == todayMonth && day == todayDay && year == todayYear
        ? [hour, minute].join(":")
        : [year, month, day].join(".");

    return result;
  };

  return (
    <Container>
      <ButtonWrap>
        <Link
          href="/group/boardModify/[id]"
          as={`/group/boardModify/${router.query.id}`}
        >
          <a className="btn  btn-radius">
            <FontAwesomeIcon icon={faEdit} />
            게시글 수정
          </a>
        </Link>
        <button
          className="btn btn-dark btn-radius"
          type="button"
          onClick={onBoardRemove}
        >
          {" "}
          <FontAwesomeIcon icon={faTrashAlt} />
          게시글 삭제
        </button>
      </ButtonWrap>
      <BoardInfo>
        <h2 className="title">
          [{boardInfo.category}] {boardInfo.title}
        </h2>
        <p className="info">
          <span>{boardInfo.User && boardInfo.User.userNickname}</span>
          <span>
            {moment(boardInfo.createdAt).format("YYYY.MM.DD") ===
            moment().format("YYYY.MM.DD")
              ? moment(boardInfo.createdAt).format("HH:mm")
              : moment(boardInfo.createdAt).format("YYYY.MM.DD")}
          </span>
        </p>
      </BoardInfo>
      <BoardContent dangerouslySetInnerHTML={{ __html: boardInfo.content }} />
      <CommentWrap>
        <p className="count">
          댓글 <span>{comments && Object.keys(comments).length}</span>
        </p>
        <form onSubmit={onSubmitComment}>
          <textarea
            type="text"
            value={comment}
            onChange={onChangeComment}
            placeholder="인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요."
            wrap="hard"
            required
          />
          <button type="submit" className="btn btn-radius">
            <FontAwesomeIcon icon={faCommentDots} />
            댓글작성
          </button>
        </form>
        <Comment>
          {comments &&
            comments.map(comment => {
              if (comment.reply === 0) {
                return (
                  <li key={comment.id}>
                    <CommentForm comment={comment} />
                    {/*comments.filter(
                      test => test.id === comment.reply && <p>11</p>
                    )*/}
                    <ol>
                      {comments.map(
                        reply =>
                          comment.id == reply.reply && (
                            <li key={reply.id}>
                              <CommentForm comment={reply} />
                            </li>
                          )
                      )}
                    </ol>
                  </li>
                );
              }
            })}
        </Comment>
      </CommentWrap>
    </Container>
  );
};

BoardView.getInitialProps = async context => {};

export default BoardView;
