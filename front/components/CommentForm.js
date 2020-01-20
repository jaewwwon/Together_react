import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  REMOVE_BOARD_COMMENT_REQUEST,
  MODIFY_BOARD_COMMENT_REQUEST,
  REPLY_BOARD_COMMENT_REQUEST
} from "../reducers/group";

const Profile = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border: 1px solid #ccc;
  border-radius: 3px;
  object-fit: cover;
`;
const ReplyButton = styled.button`
  margin-top: 4px;
  border: 0;
  background: transparent;
  font-size: 12px;
  color: #555;
  &:hover {
    text-decoration: underline;
  }
`;
const Content = styled.div`
  & > span {
    display: inline-block;
  }
  & > span > b {
    display: block;
    font-size: 13px;
    font-weight: 500;
  }
  & > pre {
    margin-top: 2px;
    font-size: 15px;
  }
`;
const Date = styled.span`
  position: relative;
  padding-left: 10px;
  margin-left: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #687a86;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    width: 5px;
    height: 5px;
    background: #c2c6cc;
    border-radius: 50%;
  }
`;
const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  .btn + .btn {
    border-left: 1px solid #ccc;
    border-radius: 0;
  }
`;
const FormWrap = styled.div`
  margin-top: 5px;
  padding: 8px 10px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  text-align: right;
  & > form textarea {
    width: 100%;
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

const CommentForm = ({ comment }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const [modifyComment, setModifyComment] = useState(comment.content);
  const [replyComment, setReplyComment] = useState("");
  const [replyFormOpened, setReplyFormOpened] = useState(false);
  const [modifyFormOpened, setModifyFormOpened] = useState(false);

  const onChangeModifyComment = useCallback(e => {
    setModifyComment(e.target.value);
  }, []);

  const onChangeReplyComment = useCallback(e => {
    setReplyComment(e.target.value);
  }, []);

  // 댓글 삭제 버튼을 눌렀을 경우
  const onRemoveComment = useCallback(e => {
    e.preventDefault();
    if (confirm("댓글을 삭제하시겠습니까?")) {
      dispatch({
        type: REMOVE_BOARD_COMMENT_REQUEST,
        data: e.target.value
      });
    } else {
      return;
    }
  });

  const onToggleCommentFrom = useCallback(e => {
    if (e.target.value == "reply") {
      setModifyFormOpened(false);
      setReplyFormOpened(prev => !prev);
    } else if (e.target.value == "modify") {
      setReplyFormOpened(false);
      setModifyFormOpened(prev => !prev);
    }
  }, []);

  // 댓글 수정 버튼을 눌렀을 경우
  const onSubmitModify = useCallback(
    e => {
      e.preventDefault();
      // console.log("id:", comment.id, "modifyComment:", modifyComment);
      dispatch({
        type: MODIFY_BOARD_COMMENT_REQUEST,
        data: { id: comment.id, comment: modifyComment }
      });
      setModifyFormOpened(false);
    },
    [modifyComment]
  );

  // 답글 쓰기 버튼을 눌렀을 경우
  const onSubmitReply = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: REPLY_BOARD_COMMENT_REQUEST,
        data: {
          id: comment.id,
          comment: replyComment,
          boardId: router.query.id
        }
      });
      setReplyComment("");
      setReplyFormOpened(false);
    },
    [replyComment]
  );

  return (
    <div>
      <Profile
        src={
          comment.User && comment.User.userProfile
            ? `http://localhost:8080/${comment.User.userProfile}`
            : "http://localhost:3000/icon_profile.png"
        }
        alt="프로필"
      />
      <Content>
        <span>
          <b>{comment.User && comment.User.userNickname}</b>
        </span>
        <Date>{comment.User && comment.createdAt}</Date>
        <pre>{comment.User && comment.content}</pre>
      </Content>
      {comment.User && comment.User.id === userInfo.id && (
        <ButtonWrap>
          <button
            className="btn btn-default"
            type="button"
            value="modify"
            onClick={onToggleCommentFrom}
          >
            수정
          </button>
          <button
            className="btn btn-default"
            type="button"
            onClick={onRemoveComment}
            value={comment.id}
          >
            삭제
          </button>
        </ButtonWrap>
      )}
      {/* 대댓글이 아닌 경우에만 답글쓰기를 허용한다. */}
      {comment.reply === 0 && (
        <ReplyButton type="button" value="reply" onClick={onToggleCommentFrom}>
          답글쓰기
        </ReplyButton>
      )}
      {replyFormOpened && (
        <FormWrap>
          <form onSubmit={onSubmitReply}>
            <textarea
              wrap="hard"
              placeholder={`"${comment.User &&
                comment.User.userNickname}"님의 댓글에 답글을 작성합니다.`}
              value={replyComment}
              onChange={onChangeReplyComment}
              wrap="hard"
              required
            ></textarea>
            <button type="submit" className="btn btn-radius">
              답글작성
            </button>
          </form>
        </FormWrap>
      )}
      {modifyFormOpened && (
        <FormWrap>
          <form onSubmit={onSubmitModify}>
            <textarea
              wrap="hard"
              value={modifyComment}
              onChange={onChangeModifyComment}
              wrap="hard"
              required
            ></textarea>
            <button type="submit" className="btn btn-radius">
              댓글수정
            </button>
          </form>
        </FormWrap>
      )}
    </div>
  );
};

CommentForm.getInitialProps = async context => {};

export default CommentForm;
