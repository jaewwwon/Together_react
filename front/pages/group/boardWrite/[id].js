import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BOARD_WRITE_REQUEST } from "../../../reducers/group";

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
  .ck-content {
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

const BoardWrite = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const editorRef = useRef();
  const { userInfo } = useSelector(state => state.user);
  const { groupDetail } = useSelector(state => state.group);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setEditorLoaded(true);
  }, []);

  const [category, setCategory] = useState(
    userInfo.id == groupDetail.User.id ? "공지사항" : "가입인사"
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: BOARD_WRITE_REQUEST,
        data: {
          category,
          title,
          content: content.data,
          groupId: router.query.id
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
    setContent({ data });
    // console.log({ event, editor, data });
  }, []);

  return (
    <Container>
      <h2>게시글 작성</h2>
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
                  // Insert the toolbar before the editable area.
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                onChange={onChangeContent}
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
            작성
          </button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

BoardWrite.getInitialProps = async context => {};

export default BoardWrite;
