import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  throttle
} from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  LOAD_MAIN_GROUPS_REQUEST,
  LOAD_MAIN_GROUPS_SUCCESS,
  LOAD_MAIN_GROUPS_FAILURE,
  LOAD_SEARCH_GROUPS_REQUEST,
  LOAD_SEARCH_GROUPS_SUCCESS,
  LOAD_SEARCH_GROUPS_FAILURE,
  LOAD_SEARCH_SCHEDULES_REQUEST,
  LOAD_SEARCH_SCHEDULES_SUCCESS,
  LOAD_SEARCH_SCHEDULES_FAILURE,
  LOAD_GROUP_INTRO_REQUEST,
  LOAD_GROUP_INTRO_SUCCESS,
  LOAD_GROUP_INTRO_FAILURE,
  GROUP_MEMBER_JOIN_REQUEST,
  GROUP_MEMBER_JOIN_SUCCESS,
  GROUP_MEMBER_JOIN_FAILURE,
  GROUP_MEMBER_LEAVE_REQUEST,
  GROUP_MEMBER_LEAVE_SUCCESS,
  GROUP_MEMBER_LEAVE_FAILURE,
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_MODIFY_REQUEST,
  BOARD_MODIFY_SUCCESS,
  BOARD_MODIFY_FAILURE,
  BOARD_REMOVE_REQUEST,
  BOARD_REMOVE_SUCCESS,
  BOARD_REMOVE_FAILURE,
  LOAD_BOARD_LIST_SUCCESS,
  LOAD_BOARD_LIST_FAILURE,
  LOAD_BOARD_LIST_REQUEST,
  LOAD_BOARD_DETAIL_REQUEST,
  LOAD_BOARD_DETAIL_SUCCESS,
  LOAD_BOARD_DETAIL_FAILURE,
  UPLOAD_GROUP_IMAGE_REQUEST,
  UPLOAD_GROUP_IMAGE_SUCCESS,
  UPLOAD_GROUP_IMAGE_FAILURE,
  UPLOAD_GALLERY_IMAGE_REQUEST,
  UPLOAD_GALLERY_IMAGE_SUCCESS,
  UPLOAD_GALLERY_IMAGE_FAILURE,
  LOAD_GROUP_GALLERY_REQUEST,
  LOAD_GROUP_GALLERY_SUCCESS,
  LOAD_GROUP_GALLERY_FAILURE,
  MODIFY_GALLERY_IMAGE_REQUEST,
  MODIFY_GALLERY_IMAGE_SUCCESS,
  MODIFY_GALLERY_IMAGE_FAILURE,
  REMOVE_GALLERY_IMAGE_REQUEST,
  REMOVE_GALLERY_IMAGE_SUCCESS,
  REMOVE_GALLERY_IMAGE_FAILURE,
  CREATE_BOARD_COMMENT_REQUEST,
  CREATE_BOARD_COMMENT_SUCCESS,
  CREATE_BOARD_COMMENT_FAILURE,
  REMOVE_BOARD_COMMENT_REQUEST,
  REMOVE_BOARD_COMMENT_SUCCESS,
  REMOVE_BOARD_COMMENT_FAILURE,
  MODIFY_BOARD_COMMENT_REQUEST,
  MODIFY_BOARD_COMMENT_SUCCESS,
  MODIFY_BOARD_COMMENT_FAILURE,
  REPLY_BOARD_COMMENT_REQUEST,
  REPLY_BOARD_COMMENT_SUCCESS,
  REPLY_BOARD_COMMENT_FAILURE,
  LOAD_MAIN_SCHEDULES_REQUEST,
  LOAD_MAIN_SCHEDULES_SUCCESS,
  LOAD_MAIN_SCHEDULES_FAILURE,
  LOAD_GROUP_SCHEDULE_REQUEST,
  LOAD_GROUP_SCHEDULE_SUCCESS,
  LOAD_GROUP_SCHEDULE_FAILURE,
  CREATE_GROUP_SCHEDULE_REQUEST,
  CREATE_GROUP_SCHEDULE_SUCCESS,
  CREATE_GROUP_SCHEDULE_FAILURE,
  MODIFY_GROUP_SCHEDULE_REQUEST,
  MODIFY_GROUP_SCHEDULE_SUCCESS,
  MODIFY_GROUP_SCHEDULE_FAILURE,
  REMOVE_GROUP_SCHEDULE_REQUEST,
  REMOVE_GROUP_SCHEDULE_SUCCESS,
  REMOVE_GROUP_SCHEDULE_FAILURE,
  ATTEND_GROUP_SCHEDULE_REQUEST,
  ATTEND_GROUP_SCHEDULE_SUCCESS,
  ATTEND_GROUP_SCHEDULE_FAILURE,
  ABSENT_GROUP_SCHEDULE_REQUEST,
  ABSENT_GROUP_SCHEDULE_SUCCESS,
  ABSENT_GROUP_SCHEDULE_FAILURE
} from "../reducers/group";
import Router from "next/router";

// 모임 생성
function createGroupAPI(createGroupData) {
  return axios.post("/group", createGroupData, {
    withCredentials: true
  });
}
function* createGroup(action) {
  try {
    const result = yield call(createGroupAPI, action.data);
    yield put({
      type: CREATE_GROUP_SUCCESS,
      data: result.data
    });
    yield Router.push(`/group/intro/${result.data.id}`);
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: CREATE_GROUP_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchCreateGroup() {
  yield takeLatest(CREATE_GROUP_REQUEST, createGroup);
}

// 모임 대표이미지 업로드
function uploadGroupImageAPI(formData) {
  return axios.post("/group/image", formData, {
    withCredentials: true
  });
}
function* uploadGroupImage(action) {
  try {
    const result = yield call(uploadGroupImageAPI, action.data);
    yield put({
      type: UPLOAD_GROUP_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_GROUP_IMAGE_FAILURE,
      error: e
    });
  }
}
function* watchUploadGroupImage() {
  yield takeLatest(UPLOAD_GROUP_IMAGE_REQUEST, uploadGroupImage);
}

// 메인화면 모임 불러오기
function loadMainGroupAPI() {
  return axios.get("/group?limit=10", {
    withCredentials: true
  });
}
function* loadMainGroup() {
  try {
    const result = yield call(loadMainGroupAPI);
    yield put({
      type: LOAD_MAIN_GROUPS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_MAIN_GROUPS_FAILURE,
      error: e
    });
  }
}
function* watchLoadMainGroup() {
  yield takeLatest(LOAD_MAIN_GROUPS_REQUEST, loadMainGroup);
}

// 검색화면 모임 불러오기
function loadSearchGroupAPI(searchData, lastId, limit = 10) {
  return axios.get(
    searchData
      ? `/group/search?category=${searchData.category}&keyword=${searchData.keyword}&limit=${limit}&lastId=${lastId}`
      : `/group/search?limit=${limit}&lastId=${lastId}`,
    {
      withCredentials: true
    }
  );
}
function* loadSearchGroup(action) {
  try {
    const result = yield call(loadSearchGroupAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_GROUPS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_SEARCH_GROUPS_FAILURE,
      error: e
    });
  }
}
function* watchLoadSearchGroup() {
  yield takeLatest(LOAD_SEARCH_GROUPS_REQUEST, loadSearchGroup);
}

// 검색화면 일정 불러오기
function loadSearchSchedulesAPI(searchData, lastDate, limit = 10) {
  return axios.get(
    searchData
      ? `/schedule/search?category=${searchData.category}&keyword=${searchData.keyword}&lastDate=${lastDate}&limit=${limit}`
      : `/schedule/search?lastDate=${lastDate}&limit=${limit}`,
    {
      withCredentials: true
    }
  );
}
function* loadSearchSchedules(action) {
  try {
    const result = yield call(
      loadSearchSchedulesAPI,
      action.data,
      action.lastDate
    );
    yield put({
      type: LOAD_SEARCH_SCHEDULES_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_SEARCH_SCHEDULES_FAILURE,
      error: e
    });
  }
}
function* watchLoadSearchSchedules() {
  yield takeLatest(LOAD_SEARCH_SCHEDULES_REQUEST, loadSearchSchedules);
  // 마지막 요청만 수락하지만 그전에 요청이 많이 가는거는 막아줄 수 없음
  // yield throttle(1000, LOAD_SEARCH_SCHEDULES_REQUEST, loadSearchSchedules);
  // throttle: 연달아서 호출되는 것을 막아줌
}

// 모임 상세 정보 불러오기
function loadGroupInfoAPI(groupInfoIdData) {
  return axios.get(`/group/${groupInfoIdData}`, groupInfoIdData, {
    withCredentials: true
  });
}
function* loadGroupInfo(action) {
  try {
    const result = yield call(loadGroupInfoAPI, action.data);
    yield put({
      type: LOAD_GROUP_INTRO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_GROUP_INTRO_FAILURE,
      error: e
    });
    // alert(e.response && e.response.data);
  }
}
function* watchLoadGroupInfo() {
  yield takeLatest(LOAD_GROUP_INTRO_REQUEST, loadGroupInfo);
}

// 모임 멤버 가입하기
function groupMemberJoinAPI(groupId) {
  return axios.post(`/group/${groupId.groupId}/member`, groupId, {
    withCredentials: true
  });
}
function* groupMemberJoin(action) {
  try {
    const result = yield call(groupMemberJoinAPI, action.data);
    yield put({
      type: GROUP_MEMBER_JOIN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: GROUP_MEMBER_JOIN_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchGroupMemberJoin() {
  yield takeLatest(GROUP_MEMBER_JOIN_REQUEST, groupMemberJoin);
}

// 모임 멤버 탈퇴하기
function groupMemberLeaveAPI(groupId) {
  return axios.delete(`/group/${groupId}/member`, {
    withCredentials: true
  });
}
function* groupMemberLeave(action) {
  try {
    const result = yield call(groupMemberLeaveAPI, action.data);
    yield put({
      type: GROUP_MEMBER_LEAVE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: GROUP_MEMBER_LEAVE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchGroupMemberLeave() {
  yield takeLatest(GROUP_MEMBER_LEAVE_REQUEST, groupMemberLeave);
}

// 게시글 작성하기
function boardWriteAPI(boardWriteData) {
  return axios.post("/board", boardWriteData, {
    withCredentials: true
  });
}
function* boardWrite(action) {
  try {
    yield call(boardWriteAPI, action.data);
    yield put({
      type: BOARD_WRITE_SUCCESS
    });
    yield Router.push(`/group/board/${action.data.groupId}`);
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: BOARD_WRITE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchBoardWrite() {
  yield takeLatest(BOARD_WRITE_REQUEST, boardWrite);
}

// 게시글 수정하기
function boardModifyAPI(modifyData) {
  return axios.patch(`/board`, modifyData, {
    withCredentials: true
  });
}
function* boardModify(action) {
  try {
    const result = yield call(boardModifyAPI, action.data);
    yield put({
      type: BOARD_MODIFY_SUCCESS,
      data: result.data
    });
    yield Router.back();
  } catch (e) {
    yield put({
      type: BOARD_MODIFY_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchBoardModify() {
  yield takeLatest(BOARD_MODIFY_REQUEST, boardModify);
}

// 게시글 삭제하기
function boardRemoveAPI(boardId) {
  return axios.delete(`/board/${boardId}`);
}
function* boardRemove(action) {
  try {
    const result = yield call(boardRemoveAPI, action.data);
    console.log("삭제된 게시글 id", result.data);
    yield put({
      type: BOARD_REMOVE_SUCCESS,
      data: result.data
    });
    yield Router.back();
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: BOARD_REMOVE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchBoardRemove() {
  yield takeLatest(BOARD_REMOVE_REQUEST, boardRemove);
}

// 게시글 목록 불러오기
function loadBoardListAPI(data, offset = 0, limit = 0) {
  return axios.get(
    data.category
      ? `/board/list/${data.groupId}?offset=${offset}&limit=${limit}&category=${data.category}&keyword=${data.keyword}`
      : `/board/list/${data.groupId}?offset=${offset}&limit=${limit}`
  );
}
function* loadBoardList(action) {
  try {
    const result = yield call(
      loadBoardListAPI,
      action.data,
      action.offset,
      action.limit
    );
    yield put({
      type: LOAD_BOARD_LIST_SUCCESS,
      data: result.data,
      page: action.page
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_BOARD_LIST_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchLoadBoardList() {
  yield takeLatest(LOAD_BOARD_LIST_REQUEST, loadBoardList);
}

// 게시글 상세 불러오기
function loadBoardDetailAPI(groupId) {
  return axios.get(`/board/${groupId}`, {
    withCredentials: true
  });
}
function* loadBoardDetail(action) {
  try {
    const result = yield call(loadBoardDetailAPI, action.data);
    yield put({
      type: LOAD_BOARD_DETAIL_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_BOARD_DETAIL_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchLoadBoardDetail() {
  yield takeLatest(LOAD_BOARD_DETAIL_REQUEST, loadBoardDetail);
}

// 모임 갤러리 불러오기
function loadGroupGalleryAPI(groupId, lastId, limit = 8) {
  return axios.get(`/group/${groupId}/gallery?lastId=${lastId}&limit=${limit}`);
}
function* loadGroupGallery(action) {
  try {
    const result = yield call(loadGroupGalleryAPI, action.data, action.lastId);
    yield put({
      type: LOAD_GROUP_GALLERY_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_GROUP_GALLERY_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchLoadGroupGallery() {
  yield takeLatest(LOAD_GROUP_GALLERY_REQUEST, loadGroupGallery);
}

// 게시글 댓글 쓰기
function createBoardCommentAPI(formData) {
  return axios.post(`/board/comment`, formData, {
    withCredentials: true
  });
}
function* createBoardComment(action) {
  try {
    const result = yield call(createBoardCommentAPI, action.data);
    yield put({
      type: CREATE_BOARD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: CREATE_BOARD_COMMENT_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchCreateBoardComment() {
  yield takeLatest(CREATE_BOARD_COMMENT_REQUEST, createBoardComment);
}

// 게시글 댓글 삭제
function removeBoardCommentAPI(commentId) {
  return axios.delete(`/board/comment/${commentId}`, commentId);
}
function* removeBoardComment(action) {
  try {
    const result = yield call(removeBoardCommentAPI, action.data);
    yield put({
      type: REMOVE_BOARD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: REMOVE_BOARD_COMMENT_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchRemoveBoardComment() {
  yield takeLatest(REMOVE_BOARD_COMMENT_REQUEST, removeBoardComment);
}

// 게시글 댓글 수정
function modifyBoardCommentAPI(modifyData) {
  return axios.patch(`/board/comment/${modifyData.id}`, modifyData, {
    withCredentials: true
  });
}
function* modifyBoardComment(action) {
  try {
    const result = yield call(modifyBoardCommentAPI, action.data);
    yield put({
      type: MODIFY_BOARD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: MODIFY_BOARD_COMMENT_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchModifyBoardComment() {
  yield takeLatest(MODIFY_BOARD_COMMENT_REQUEST, modifyBoardComment);
}

// 게시글 대댓글 쓰기
function replyBoardCommentAPI(replyData) {
  return axios.post(`/board/comment/reply`, replyData, {
    withCredentials: true
  });
}
function* replyBoardComment(action) {
  try {
    const result = yield call(replyBoardCommentAPI, action.data);
    console.log("result:", result);
    yield put({
      type: REPLY_BOARD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: REPLY_BOARD_COMMENT_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchReplyBoardComment() {
  yield takeLatest(REPLY_BOARD_COMMENT_REQUEST, replyBoardComment);
}

// 모임 갤러리 이미지 업로드
function uploadGalleryImageAPI(formData) {
  return axios.post(
    `/group/${formData.groupId}/gallery`,
    formData.imageFormData,
    { withCredentials: true }
  );
}
function* uploadGalleryImage(action) {
  try {
    const result = yield call(uploadGalleryImageAPI, action.data);
    yield put({
      type: UPLOAD_GALLERY_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_GALLERY_IMAGE_FAILURE,
      error: e
    });
  }
}
function* watchUploadGalleryImage() {
  yield takeLatest(UPLOAD_GALLERY_IMAGE_REQUEST, uploadGalleryImage);
}

// 모임 갤러리 이미지 수정
function modifyGalleryAPI(modifyData) {
  return axios.patch(
    `/group/gallery/${modifyData.galleryId}`,
    modifyData.imageFormData,
    {
      withCredentials: true
    }
  );
}
function* modifyGallery(action) {
  try {
    const result = yield call(modifyGalleryAPI, action.data);
    yield put({
      type: MODIFY_GALLERY_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: MODIFY_GALLERY_IMAGE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchModifyGallery() {
  yield takeLatest(MODIFY_GALLERY_IMAGE_REQUEST, modifyGallery);
}

// 모임 갤러리 이미지 삭제
function removeGalleryAPI(removeData) {
  return axios.delete(`/group/${removeData.groupId}/gallery`, {
    data: { galleryId: removeData.galleryId },
    withCredentials: true
  });
}
function* removeGallery(action) {
  try {
    const result = yield call(removeGalleryAPI, action.data);
    yield put({
      type: REMOVE_GALLERY_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: REMOVE_GALLERY_IMAGE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchRemoveGallery() {
  yield takeLatest(REMOVE_GALLERY_IMAGE_REQUEST, removeGallery);
}

// 전체 일정 불러오기
function loadMainSchedulesAPI(groupId, limit = 10) {
  return axios.get(`/schedule?limit=${limit}`, {
    withCredentials: true
  });
}
function* loadMainSchedules(action) {
  try {
    const result = yield call(loadMainSchedulesAPI, action.data);
    yield put({
      type: LOAD_MAIN_SCHEDULES_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_MAIN_SCHEDULES_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchLoadMainSchedules() {
  yield takeLatest(LOAD_MAIN_SCHEDULES_REQUEST, loadMainSchedules);
}

// 모임 일정 불러오기
function loadGroupScheduleAPI(groupId, lastDate, limit = 10) {
  return axios.get(`/schedule/${groupId}?limit=${limit}&lastDate=${lastDate}`, {
    withCredentials: true
  });
}
function* loadGroupSchedule(action) {
  try {
    const result = yield call(
      loadGroupScheduleAPI,
      action.data,
      action.lastDate
    );
    yield put({
      type: LOAD_GROUP_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: LOAD_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchLoadGroupSchedule() {
  yield takeLatest(LOAD_GROUP_SCHEDULE_REQUEST, loadGroupSchedule);
}

// 모임 일정 등록
function createGroupScheduleAPI(scheduleData) {
  return axios.post("/schedule", scheduleData, {
    withCredentials: true
  });
}
function* createGroupSchedule(action) {
  try {
    const result = yield call(createGroupScheduleAPI, action.data);
    yield put({
      type: CREATE_GROUP_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: CREATE_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchCreateGroupSchedule() {
  yield takeLatest(CREATE_GROUP_SCHEDULE_REQUEST, createGroupSchedule);
}

// 모임 일정 수정
function modifyGroupScheduleAPI(scheduleData) {
  return axios.patch(`/schedule/${scheduleData.scheduleId}`, scheduleData, {
    withCredentials: true
  });
}
function* modifyGroupSchedule(action) {
  try {
    const result = yield call(modifyGroupScheduleAPI, action.data);
    yield put({
      type: MODIFY_GROUP_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: MODIFY_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchModifyGroupSchedule() {
  yield takeLatest(MODIFY_GROUP_SCHEDULE_REQUEST, modifyGroupSchedule);
}

// 모임 일정 삭제
function removeGroupScheduleAPI(scheduleId) {
  return axios.delete(`/schedule/${scheduleId}`, {
    withCredentials: true
  });
}
function* removeGroupSchedule(action) {
  try {
    const result = yield call(removeGroupScheduleAPI, action.data);
    yield put({
      type: REMOVE_GROUP_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: REMOVE_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchRemoveGroupSchedule() {
  yield takeLatest(REMOVE_GROUP_SCHEDULE_REQUEST, removeGroupSchedule);
}

// 모임 일정 참석
function attendGroupScheduleAPI(scheduleId) {
  return axios.post(`/schedule/${scheduleId}/member`, null, {
    withCredentials: true
  });
}
function* attendGroupSchedule(action) {
  try {
    const result = yield call(attendGroupScheduleAPI, action.data);
    yield put({
      type: ATTEND_GROUP_SCHEDULE_SUCCESS,
      data: {
        scheduleId: action.data,
        user: result.data
      }
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: ATTEND_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchAttendGroupSchedule() {
  yield takeLatest(ATTEND_GROUP_SCHEDULE_REQUEST, attendGroupSchedule);
}

// 모임 일정 참석취소
function absentGroupScheduleAPI(scheduleId) {
  return axios.delete(`/schedule/${scheduleId}/member`, {
    withCredentials: true
  });
}
function* absentGroupSchedule(action) {
  try {
    const result = yield call(absentGroupScheduleAPI, action.data);
    yield put({
      type: ABSENT_GROUP_SCHEDULE_SUCCESS,
      data: {
        scheduleId: action.data,
        userId: result.data
      }
    });
  } catch (e) {
    // yield console.dir(e);
    yield put({
      type: ABSENT_GROUP_SCHEDULE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchAbsentGroupSchedule() {
  yield takeLatest(ABSENT_GROUP_SCHEDULE_REQUEST, absentGroupSchedule);
}

export default function* userSaga() {
  yield all([
    fork(watchCreateGroup),
    fork(watchLoadMainGroup),
    fork(watchLoadSearchGroup),
    fork(watchLoadSearchSchedules),
    fork(watchLoadGroupInfo),
    fork(watchGroupMemberJoin),
    fork(watchGroupMemberLeave),
    fork(watchBoardWrite),
    fork(watchBoardModify),
    fork(watchBoardRemove),
    fork(watchLoadBoardList),
    fork(watchLoadBoardDetail),
    fork(watchUploadGroupImage),
    fork(watchUploadGalleryImage),
    fork(watchLoadGroupGallery),
    fork(watchModifyGallery),
    fork(watchCreateBoardComment),
    fork(watchRemoveBoardComment),
    fork(watchModifyBoardComment),
    fork(watchReplyBoardComment),
    fork(watchRemoveGallery),
    fork(watchLoadMainSchedules),
    fork(watchLoadGroupSchedule),
    fork(watchCreateGroupSchedule),
    fork(watchModifyGroupSchedule),
    fork(watchRemoveGroupSchedule),
    fork(watchAttendGroupSchedule),
    fork(watchAbsentGroupSchedule)
  ]);
}
