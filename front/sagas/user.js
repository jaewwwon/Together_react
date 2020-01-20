import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay
} from "redux-saga/effects";
import axios from "axios";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  USER_LEAVE_REQUEST,
  USER_LEAVE_SUCCESS,
  USER_LEAVE_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_INFO,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPLOAD_PROFILE_REQUEST,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
  EDIT_USER_INFO_REQUEST,
  LOAD_USER_CREATED_GROUPS_REQUEST,
  LOAD_USER_CREATED_GROUPS_SUCCESS,
  LOAD_USER_CREATED_GROUPS_FAILURE,
  LOAD_USER_JOIN_GROUPS_REQUEST,
  LOAD_USER_JOIN_GROUPS_SUCCESS,
  LOAD_USER_JOIN_GROUPS_FAILURE,
  UPLOAD_MODIFY_GROUP_IMAGE_REQUEST,
  UPLOAD_MODIFY_GROUP_IMAGE_SUCCESS,
  UPLOAD_MODIFY_GROUP_IMAGE_FAILURE,
  MODIFY_GROUP_INFO_REQUEST,
  MODIFY_GROUP_INFO_SUCCESS,
  MODIFY_GROUP_INFO_FAILURE
} from "../reducers/user";
import Router from "next/router";

// 회원가입
function signUpAPI(signUpData) {
  return axios.post("/user/signup", signUpData);
}
function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS
    });
    yield alert("회원가입을 축하드립니다.\n로그인 페이지로 이동합니다.");
    yield Router.push("/login");
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 회원탈퇴
function userLeaveAPI(userLeaveData) {
  console.log("userLeaveData", userLeaveData);
  return axios.delete(`/user/leave/${userLeaveData.userId}`, {
    data: { userPassword: userLeaveData.userPassword },
    withCredentials: true
  });
}
function* userLeave(action) {
  try {
    yield call(userLeaveAPI, action.data);
    yield put({
      type: USER_LEAVE_SUCCESS
    });
    yield alert(
      "회원 탈퇴가 정상적으로 진행되었습니다.\n메인 페이지로 이동합니다."
    );
    yield Router.push("/");
  } catch (e) {
    yield put({
      type: USER_LEAVE_FAILURE,
      error: e
    });
    alert(e.response && e.response.data);
  }
}
function* watchUserLeave() {
  yield takeLatest(USER_LEAVE_REQUEST, userLeave);
}

// 로그인
function logInAPI(loginData) {
  return axios.post("/user/login", loginData, {
    withCredentials: true // 이설정을 해줘야 서버와 쿠키를 주고 받을 수 있다.
  });
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
    yield Router.push("/");
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      reason: e.response && e.response.data
    });
    alert(e.response && e.response.data);
  }
}
function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// 로그아웃
function logOutAPI() {
  return axios.post("/user/logout", null, {
    withCredentials: true
  });
}
function* loginOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
    yield Router.push("/");
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, loginOut);
}

// 사용자 정보 불러오기
function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", {
    withCredentials: true
  });
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}
function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

// 사용자 프로필 업로드
function uploadProfileAPI(formData) {
  return axios.post("/user/profile", formData, {
    withCredentials: true
  });
}
function* uploadProfile(action) {
  try {
    const result = yield call(uploadProfileAPI, action.data);
    yield put({
      type: UPLOAD_PROFILE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_PROFILE_FAILURE,
      error: e
    });
  }
}
function* watchUploadProfile() {
  yield takeLatest(UPLOAD_PROFILE_REQUEST, uploadProfile);
}

// 사용자 정보 수정
function editUserInfoAPI(formData) {
  return axios.patch("/user", formData, {
    withCredentials: true
  });
}
function* editUserInfo(action) {
  try {
    const result = yield call(editUserInfoAPI, action.data);
    yield put({
      type: EDIT_USER_INFO_SUCCESS,
      data: result.data
    });
    yield alert("회원정보가 수정되었습니다.");
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_USER_INFO_FAILURE,
      error: e
    });
  }
}
function* watchEditUserInfo() {
  yield takeLatest(EDIT_USER_INFO_REQUEST, editUserInfo);
}

// 생성한 모임 리스트 불러오기
function loadUserCreatedGroupsAPI(offset = 0, limit = 0) {
  return axios.get(`/user/group/create?offset=${offset}&limit=${limit}`, {
    withCredentials: true
  });
}
function* loadUserCreatedGroups(action) {
  try {
    const result = yield call(
      loadUserCreatedGroupsAPI,
      action.offset,
      action.limit
    );
    yield put({
      type: LOAD_USER_CREATED_GROUPS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_CREATED_GROUPS_FAILURE,
      error: e
    });
  }
}
function* watchLoadUserCreatedGroups() {
  yield takeEvery(LOAD_USER_CREATED_GROUPS_REQUEST, loadUserCreatedGroups);
}

// 가입한 모임 리스트 불러오기
function loadUserJoinGroupsAPI(offset = 0, limit = 0) {
  return axios.get(`/user/group/join?offset=${offset}&limit=${limit}`, {
    withCredentials: true
  });
}
function* loadUserJoinGroups(action) {
  try {
    const result = yield call(
      loadUserJoinGroupsAPI,
      action.offset,
      action.limit
    );
    yield put({
      type: LOAD_USER_JOIN_GROUPS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_JOIN_GROUPS_FAILURE,
      error: e
    });
  }
}
function* watchLoadUserJoinGroups() {
  yield takeEvery(LOAD_USER_JOIN_GROUPS_REQUEST, loadUserJoinGroups);
}

// 모임 대표이미지 업로드
function uploadGroupImageAPI(formData) {
  return axios.post("/group/image", formData, {
    withCredentials: true
  });

  return axios.post(
    `/group/${formData.groupId}/gallery`,
    formData.imageFormData,
    { withCredentials: true }
  );
}
function* uploadGroupImage(action) {
  try {
    const result = yield call(uploadGroupImageAPI, action.data);
    yield put({
      type: UPLOAD_MODIFY_GROUP_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_MODIFY_GROUP_IMAGE_FAILURE,
      error: e
    });
  }
}
function* watchUploadGroupImage() {
  yield takeLatest(UPLOAD_MODIFY_GROUP_IMAGE_REQUEST, uploadGroupImage);
}

// 모임 정보 수정
function modifyGroupInfoAPI(data) {
  return axios.patch(`/group/${data.groupId}`, data, {
    withCredentials: true
  });
}
function* modifyGroupInfo(action) {
  try {
    const result = yield call(modifyGroupInfoAPI, action.data);
    console.log("result", result);
    yield put({
      type: MODIFY_GROUP_INFO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: MODIFY_GROUP_INFO_FAILURE,
      error: e
    });
  }
}
function* watchModifyGroupInfo() {
  yield takeLatest(MODIFY_GROUP_INFO_REQUEST, modifyGroupInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchUserLeave),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchUploadProfile),
    fork(watchEditUserInfo),
    fork(watchLoadUserCreatedGroups),
    fork(watchLoadUserJoinGroups),
    fork(watchUploadGroupImage),
    fork(watchModifyGroupInfo)
  ]);
}
