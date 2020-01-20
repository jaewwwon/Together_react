import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  LOAD_BOARD_DETAIL_REQUEST,
  BOARD_MODIFY_REQUEST
} from "../../../reducers/group";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
  & > h2 {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
  }
  form {
    margin-top: 22px;
  }
  form > div:first-child {
    border: 1px solid #dedede;
    padding: 13px 12px;
    border-radius: 4px;
  }
  .input_area + .input_area {
    margin-top: 12px;
  }
  .input_area > select,
  .input_area > input[type="text"] {
    width: 100%;
    height: 34px;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .ck-content > p {
    min-height: 340px;
  }
`;
const ButtonWrap = styled.div`
  margin-top: 24px;
  text-align: center;
  .btn + .btn {
    margin-left: 10px;
  }
`;

const BoardModify = () => {
  const router = useRouter();
  const editorRef = useRef();
  const dispatch = useDispatch();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const { userInfo } = useSelector(state => state.user);
  const { boardInfo, groupDetail } = useSelector(state => state.group);
  const [category, setCategory] = useState(boardInfo.category);
  const [title, setTitle] = useState(boardInfo.title);
  const [content, setContent] = useState(boardInfo.content);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    // 게시글 정보 불러오기
    dispatch({
      type: LOAD_BOARD_DETAIL_REQUEST,
      data: router.query.id
    });

    // 에디터
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setEditorLoaded(true);
  }, []);

  // 수정 버튼을 눌렀을 경우
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: BOARD_MODIFY_REQUEST,
        data: {
          id: boardInfo.id,
          category,
          title,
          content: content
        }
      });
    },
    [category, title, content]
  );

  const onChangeCategory = useCallback(e => {
    setCategory(e.target.value);
  }, []);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback((event, editor) => {
    const data = editor.getData();
    setContent(data);
  }, []);

  return (
    <Container>
      <h2>게시글 수정</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="input_area">
            <select id="category" value={category} onChange={onChangeCategory}>
              {userInfo.id == groupDetail.User.id && (
                <option value="공지사항">공지사항</option>
              )}
              <option value="가입인사">가입인사</option>
              <option value="자유글">자유글</option>
              <option value="건의사항">건의사항</option>
            </select>
          </div>
          <div className="input_area">
            <input
              id="title"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="input_area">
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                onInit={editor => {
                  console.log("Editor is ready to use!", editor);

                  // Insert the toolbar before the editable area.
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                onChange={onChangeContent}
                data={content}
              />
            ) : (
              <div>Editor loading</div>
            )}
          </div>
        </div>
        <ButtonWrap>
          <button
            type="button"
            className="btn btn-middle"
            onClick={Router.back}
          >
            취소
          </button>
          <button type="submit" className="btn btn-middle btn-submit">
            수정
          </button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

BoardModify.getInitialProps = async context => {};

export default BoardModify;
