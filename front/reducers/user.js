// store
export const initialState = {
  userInfo: null, //회원 정보
  imagePaths: [], // 미리보기 이미지 경로
  joinGroupList: [], // 가입한 모임 리스트
  createGroupList: [], // 생성한 모임 리스트
  groupImages: [],
  signUpErrorReason: "", // 회원가입 실패 사유
  userLeaveErrorReason: "", // 회원탈퇴 실패 사유
  logInErrorReason: "", // 로그인 실패 사유
  logOutErrorReason: "", // 로그아웃 실패 사유
  loadUserErrorReason: "", // 사용자 정보 요청 실패 사유
  loadProfileErrorReason: "" //사용자 프로필 업로드 실패 사유
};

// action 이름
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"; // 회원가입 요청
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"; // 회원가입 성공
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"; // 회원가입 실패

export const USER_LEAVE_REQUEST = "USER_LEAVE_REQUEST"; // 회원탈퇴 요청
export const USER_LEAVE_SUCCESS = "USER_LEAVE_SUCCESS"; // 회원탈퇴 성공
export const USER_LEAVE_FAILURE = "USER_LEAVE_FAILURE"; // 회원탈퇴 실패

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 로그인 요청
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; // 로그인 성공
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; // 로그인 실패

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"; // 로그아웃 요청
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"; // 로그아웃 성공
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"; // 로그아웃 실패

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"; // 사용자 정보 요청
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"; // 사용자 정보 성공
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"; // 사용자 정보 실패

export const UPLOAD_PROFILE_REQUEST = "UPLOAD_PROFILE_REQUEST"; // 사용자 프로필 업로드 요청
export const UPLOAD_PROFILE_SUCCESS = "UPLOAD_PROFILE_SUCCESS"; // 사용자 프로필 업로드 성공
export const UPLOAD_PROFILE_FAILURE = "UPLOAD_PROFILE_FAILURE"; // 사용자 프로필 업로드 실패

export const REMOVE_IMAGE = "REMOVE_IMAGE"; // 이미지 삭제

export const EDIT_USER_INFO_REQUEST = "EDIT_USER_INFO_REQUEST"; // 사용자 정보 수정 요청
export const EDIT_USER_INFO_SUCCESS = "EDIT_USER_INFO_SUCCESS"; // 사용자 정보 수정 성공
export const EDIT_USER_INFO_FAILURE = "EDIT_USER_INFO_FAILURE"; // 사용자 정보 수정 실패

export const LOAD_USER_CREATED_GROUPS_REQUEST =
  "LOAD_USER_CREATED_GROUPS_REQUEST"; // 생성한 모임 리스트 요청
export const LOAD_USER_CREATED_GROUPS_SUCCESS =
  "LOAD_USER_CREATED_GROUPS_SUCCESS"; // 생성한 모임 리스트 성공
export const LOAD_USER_CREATED_GROUPS_FAILURE =
  "LOAD_USER_CREATED_GROUPS_FAILURE"; // 생성한 모임 리스트 실패

export const LOAD_USER_JOIN_GROUPS_REQUEST = "LOAD_USER_JOIN_GROUPS_REQUEST"; // 가입한 모임 리스트 요청
export const LOAD_USER_JOIN_GROUPS_SUCCESS = "LOAD_USER_JOIN_GROUPS_SUCCESS"; // 가입한 모임 리스트 성공
export const LOAD_USER_JOIN_GROUPS_FAILURE = "LOAD_USER_JOIN_GROUPS_FAILURE"; // 가입한 모임 리스트 실패

export const UPLOAD_MODIFY_GROUP_IMAGE_REQUEST =
  "UPLOAD_MODIFY_GROUP_IMAGE_REQUEST"; // 모임 대표 이미지 업로드 요청
export const UPLOAD_MODIFY_GROUP_IMAGE_SUCCESS =
  "UPLOAD_MODIFY_GROUP_IMAGE_SUCCESS"; // 모임 대표 이미지 업로드 성공
export const UPLOAD_MODIFY_GROUP_IMAGE_FAILURE =
  "UPLOAD_MODIFY_GROUP_IMAGE_FAILURE"; // 모임 대표 이미지 업로드 실패

export const REMOVE_GROUP_IMAGE = "REMOVE_GROUP_IMAGE"; // 모임 대표 이미지 삭제

export const MODIFY_GROUP_INFO_REQUEST = "MODIFY_GROUP_INFO_REQUEST"; // 모임 정보 수정 요청
export const MODIFY_GROUP_INFO_SUCCESS = "MODIFY_GROUP_INFO_SUCCESS"; // 모임 정보 수정 성공
export const MODIFY_GROUP_INFO_FAILURE = "MODIFY_GROUP_INFO_FAILURE"; // 모임 정보 수정 실패

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpErrorReason: ""
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpErrorReason: action.error
      };
    }
    case USER_LEAVE_REQUEST: {
      return {
        ...state,
        userLeaveErrorReason: ""
      };
    }
    case USER_LEAVE_SUCCESS: {
      return {
        ...state,
        userInfo: null
      };
    }
    case USER_LEAVE_FAILURE: {
      return {
        ...state,
        userLeaveErrorReason: action.error
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        userInfo: false,
        logInErrorReason: ""
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        userInfo: action.data
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        userInfo: null,
        logInErrorReason: action.reason
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutErrorReason: ""
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        userInfo: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logOutErrorReason: action.error
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.data
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
        loadUserErrorReason: action.error
      };
    }
    case UPLOAD_PROFILE_REQUEST: {
      return {
        ...state,
        loadProfileErrorReason: ""
      };
    }
    case UPLOAD_PROFILE_SUCCESS: {
      return {
        ...state,
        imagePaths: [...state.imagePaths, ...action.data]
      };
    }
    case UPLOAD_PROFILE_FAILURE: {
      return {
        ...state,
        loadProfileErrorReason: action.error
      };
    }
    case REMOVE_IMAGE: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter((v, i) => i !== action.index)
      };
    }
    case EDIT_USER_INFO_REQUEST: {
      return {
        ...state
      };
    }
    case EDIT_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.data,
        imagePaths: []
      };
    }
    case EDIT_USER_INFO_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_USER_CREATED_GROUPS_REQUEST: {
      return {
        ...state,
        createGroupList: []
      };
    }
    case LOAD_USER_CREATED_GROUPS_SUCCESS: {
      return {
        ...state,
        createGroupList: action.data
      };
    }
    case LOAD_USER_CREATED_GROUPS_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_USER_JOIN_GROUPS_REQUEST: {
      return {
        ...state,
        joinGroupList: []
      };
    }
    case LOAD_USER_JOIN_GROUPS_SUCCESS: {
      return {
        ...state,
        joinGroupList: action.data
      };
    }
    case LOAD_USER_JOIN_GROUPS_FAILURE: {
      return {
        ...state
      };
    }
    case UPLOAD_MODIFY_GROUP_IMAGE_REQUEST: {
      return {
        ...state
      };
    }
    case UPLOAD_MODIFY_GROUP_IMAGE_SUCCESS: {
      return {
        ...state,
        groupImages: [...action.data]
      };
    }
    case UPLOAD_MODIFY_GROUP_IMAGE_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_GROUP_IMAGE: {
      return {
        ...state,
        groupImages: []
      };
    }
    case MODIFY_GROUP_INFO_REQUEST: {
      return {
        ...state
      };
    }
    case MODIFY_GROUP_INFO_SUCCESS: {
      // 수정하는 모임의 index 찾기
      const groupIndex = state.createGroupList.rows.findIndex(
        v => v.id === action.data.id
      );
      const createGroupList = [...state.createGroupList.rows];
      createGroupList[groupIndex] = action.data;

      return {
        ...state,
        createGroupList: {
          ...createGroupList,
          rows: createGroupList
        }
      };
    }
    case MODIFY_GROUP_INFO_FAILURE: {
      return {
        ...state
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
