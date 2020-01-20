import React, { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GroupHead from "../../../components/GroupHead";
import {
  UPLOAD_GALLERY_IMAGE_REQUEST,
  MODIFY_GALLERY_IMAGE_REQUEST,
  REMOVE_GALLERY_IMAGE_REQUEST,
  LOAD_GROUP_GALLERY_REQUEST
} from "../../../reducers/group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import ImageZoom from "../../../components/ImageZoom";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 52px auto;
  padding: 0 15px;
  .button_more {
    width: 100%;
    margin-top: 12px;
    font-weight: 500;
  }
`;
const ButtonWrap = styled.div`
  text-align: right;
`;
const GalleryList = styled.ul`
  margin-top: 15px;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  & > li {
    position: relative;
    width: 24%;
    margin: 0.5%;
    height: 0;
    float: left;
    padding-top: 25%;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .imageButton {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background: transparent;
  }
  .imageButton img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PhotoControler = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  .btn {
    padding: 2px 12px;
  }
  .btn + .btn {
    margin-left: 3px;
  }
`;

const Gallery = () => {
  const { userInfo } = useSelector(state => state.user);
  const { groupDetail, galleryList, hasMoreItem } = useSelector(
    state => state.group
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const imageInput = useRef();
  const imageModifyInput = useRef();
  const [imageId, setImageId] = useState("");
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  const MemberState =
    (userInfo &&
      groupDetail &&
      groupDetail.Members &&
      groupDetail.Members.find(member => userInfo.id == member.id)) ||
    (userInfo &&
      groupDetail &&
      groupDetail.User &&
      groupDetail.User.id == userInfo.id);

  if (!MemberState) {
    alert("모임 멤버만 이용가능합니다.");
    Router.back();
    return null;
  }

  useEffect(() => {
    dispatch({
      type: LOAD_GROUP_GALLERY_REQUEST,
      data: router.query.id
    });
  }, []);

  const loadMoreImages = useCallback(() => {
    if (galleryList[0] && hasMoreItem) {
      dispatch({
        type: LOAD_GROUP_GALLERY_REQUEST,
        data: router.query.id,
        lastId: galleryList[galleryList.length - 1].id
      });
    }
  }, [galleryList.length, hasMoreItem]);

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f);
    });
    console.log(imageFormData);
    dispatch({
      type: UPLOAD_GALLERY_IMAGE_REQUEST,
      data: { groupId: router.query.id, imageFormData }
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImageModify = useCallback(
    e => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f);
      });
      dispatch({
        type: MODIFY_GALLERY_IMAGE_REQUEST,
        data: { imageFormData, galleryId: imageId }
      });
    },
    [imageId]
  );

  const onClickImageModify = useCallback(
    id => () => {
      setImageId(id);
      imageModifyInput.current.click();
    },
    [imageModifyInput.current]
  );

  const onRemoveImage = useCallback(
    id => () => {
      if (confirm("해당 사진을 삭제하시겠습니까?")) {
        dispatch({
          type: REMOVE_GALLERY_IMAGE_REQUEST,
          data: { galleryId: id, groupId: router.query.id }
        });
      }
    },
    []
  );

  const onImageZoom = useCallback(e => {
    setImageIdx(e.currentTarget.value);
    setShowImageZoom(true);
  }, []);

  const onCloseImageZoom = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  return (
    <Container>
      <GroupHead />
      {userInfo && groupDetail && userInfo.id === groupDetail.id && (
        <ButtonWrap>
          <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <button
            className="btn btn-radius"
            type="button"
            onClick={onClickImageUpload}
          >
            <FontAwesomeIcon icon={faUpload} />
            사진 등록
          </button>
        </ButtonWrap>
      )}
      <GalleryList>
        {galleryList &&
          galleryList.map((image, index) => (
            <li key={image.id}>
              <button
                className="imageButton"
                type="button"
                onClick={onImageZoom}
                value={index}
              >
                <img
                  src={`http://localhost:8080/${image.imagePath}`}
                  alt={image.imagePath}
                />
              </button>
              <input
                type="file"
                multiple
                hidden
                ref={imageModifyInput}
                onChange={onChangeImageModify}
              />
              {userInfo && groupDetail && userInfo.id === groupDetail.id && (
                <PhotoControler>
                  <button
                    className="btn btn-radius"
                    type="button"
                    onClick={onClickImageModify(image.id)}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-radius btn-dark"
                    type="button"
                    onClick={onRemoveImage(image.id)}
                  >
                    삭제
                  </button>
                </PhotoControler>
              )}
            </li>
          ))}
      </GalleryList>
      {hasMoreItem && (
        <button
          className="btn button_more"
          type="button"
          onClick={loadMoreImages}
        >
          더보기
        </button>
      )}
      {showImageZoom && (
        <ImageZoom
          images={galleryList}
          imageIdx={imageIdx}
          onCloseImageZoom={onCloseImageZoom}
        />
      )}
    </Container>
  );
};

// Gallery.getInitialProps = async context => {
//   const state = context.store.getState();
//   // console.log(Object.keys(context));
//   context.store.dispatch({
//     type: LOAD_GROUP_GALLERY_REQUEST,
//     data: 1
//   });
// };

export default Gallery;
