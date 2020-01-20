// store
export const initialState = {
  // isSignedUp: false, // 회원가입 성공
  // signUpErrorReason: "", // 회원가입 실패 사유
  // logInErrorReason: "", // 로그인 실패 사유
  // logOutErrorReason: "", // 로그아웃 실패 사유
  mainGroups: [], // 메인화면 모임 리스트
  mainSchedules: [], // 메인화면 일정 리스트
  searchGroups: [], // 검색페이지 모임 결과
  searchSchedules: [], // 검색페이지 일정 결과
  groupImages: [],
  groupDetail: null, //모임 정보
  boardInfo: [], // 게시글 정보
  boardList: [], // 게시글 리스트
  boardPage: 1, // 게시글 페이지
  scheduleList: [], // 일정 리스트
  galleryList: [], // 사진첩 리스트
  hasMoreItem: false,
  boardContent: "",
  loadSearchGroupsReason: "",
  createGroupErrorReason: "", //모임 만들기 실패 사유
  writeBoardErrorReason: "", //게시글 작성 실패 사유
  loadGroupImageErrorReason: "", // 모임 대표이미지 업로드 실패 사유
  loadGalleryImageErrorReason: "" // 모임 갤러리 이미지 업로드 실패 사유
};

// action 이름
export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST"; // 모임 만들기 요청
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS"; // 모임 만들기 성공
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE"; // 모임 만들기 실패

export const UPLOAD_GROUP_IMAGE_REQUEST = "UPLOAD_GROUP_IMAGE_REQUEST"; // 모임 대표 이미지 업로드 요청
export const UPLOAD_GROUP_IMAGE_SUCCESS = "UPLOAD_GROUP_IMAGE_SUCCESS"; // 모임 대표 이미지 업로드 성공
export const UPLOAD_GROUP_IMAGE_FAILURE = "UPLOAD_GROUP_IMAGE_FAILURE"; // 모임 대표 이미지 업로드 실패

export const REMOVE_GROUP_IMAGE = "REMOVE_GROUP_IMAGE"; // 모임 대표 이미지 삭제

export const LOAD_MAIN_GROUPS_REQUEST = "LOAD_MAIN_GROUPS_REQUEST"; // [메인페이지]모임 불러오기 요청
export const LOAD_MAIN_GROUPS_SUCCESS = "LOAD_MAIN_GROUPS_SUCCESS"; // [메인페이지]모임 불러오기 성공
export const LOAD_MAIN_GROUPS_FAILURE = "LOAD_MAIN_GROUPS_FAILURE"; // [메인페이지]모임 불러오기 실패

export const LOAD_SEARCH_GROUPS_REQUEST = "LOAD_SEARCH_GROUPS_REQUEST"; // [검색페이지]모임 불러오기 요청
export const LOAD_SEARCH_GROUPS_SUCCESS = "LOAD_SEARCH_GROUPS_SUCCESS"; // [검색페이지]모임 불러오기 성공
export const LOAD_SEARCH_GROUPS_FAILURE = "LOAD_SEARCH_GROUPS_FAILURE"; // [검색페이지]모임 불러오기 실패

export const LOAD_SEARCH_SCHEDULES_REQUEST = "LOAD_SEARCH_SCHEDULES_REQUEST"; // [검색페이지]일정 불러오기 요청
export const LOAD_SEARCH_SCHEDULES_SUCCESS = "LOAD_SEARCH_SCHEDULES_SUCCESS"; // [검색페이지]일정 불러오기 성공
export const LOAD_SEARCH_SCHEDULES_FAILURE = "LOAD_SEARCH_SCHEDULES_FAILURE"; // [검색페이지]일정 불러오기 실패

export const LOAD_GROUP_INTRO_REQUEST = "LOAD_GROUP_INTRO_REQUEST"; // 모임 불러오기 요청
export const LOAD_GROUP_INTRO_SUCCESS = "LOAD_GROUP_INTRO_SUCCESS"; // 모임 불러오기 성공
export const LOAD_GROUP_INTRO_FAILURE = "LOAD_GROUP_INTRO_FAILURE"; // 모임 불러오기 실패

export const GROUP_MEMBER_JOIN_REQUEST = "GROUP_MEMBER_JOIN_REQUEST"; // 모임 멤버 가입하기 요청
export const GROUP_MEMBER_JOIN_SUCCESS = "GROUP_MEMBER_JOIN_SUCCESS"; // 모임 멤버 가입하기 성공
export const GROUP_MEMBER_JOIN_FAILURE = "GROUP_MEMBER_JOIN_FAILURE"; // 모임 멤버 가입하기 실패

export const GROUP_MEMBER_LEAVE_REQUEST = "GROUP_MEMBER_LEAVE_REQUEST"; // 모임 멤버 탈퇴하기 요청
export const GROUP_MEMBER_LEAVE_SUCCESS = "GROUP_MEMBER_LEAVE_SUCCESS"; // 모임 멤버 탈퇴하기 성공
export const GROUP_MEMBER_LEAVE_FAILURE = "GROUP_MEMBER_LEAVE_FAILURE"; // 모임 멤버 탈퇴하기 실패

export const LOAD_BOARD_LIST_REQUEST = "LOAD_BOARD_LIST_REQUEST"; // 게시글 목록 불러오기 요청
export const LOAD_BOARD_LIST_SUCCESS = "LOAD_BOARD_LIST_SUCCESS"; // 게시글 목록  불러오기 성공
export const LOAD_BOARD_LIST_FAILURE = "LOAD_BOARD_LIST_FAILURE"; // 게시글 목록  불러오기 실패

export const LOAD_BOARD_DETAIL_REQUEST = "LOAD_BOARD_DETAIL_REQUEST"; // 게시글 불러오기 요청
export const LOAD_BOARD_DETAIL_SUCCESS = "LOAD_BOARD_DETAIL_SUCCESS"; // 게시글 불러오기 성공
export const LOAD_BOARD_DETAIL_FAILURE = "LOAD_GROUP_GALLERY_FAILURE"; // 게시글 불러오기 실패

export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST"; // 게시글 쓰기 요청
export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS"; // 게시글 쓰기 성공
export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE"; // 게시글 쓰기 실패

export const BOARD_MODIFY_REQUEST = "BOARD_MODIFY_REQUEST"; // 게시글 수정 요청
export const BOARD_MODIFY_SUCCESS = "BOARD_MODIFY_SUCCESS"; // 게시글 수정 성공
export const BOARD_MODIFY_FAILURE = "BOARD_MODIFY_FAILURE"; // 게시글 수정 실패

export const BOARD_REMOVE_REQUEST = "BOARD_REMOVE_REQUEST"; // 게시글 삭제 요청
export const BOARD_REMOVE_SUCCESS = "BOARD_REMOVE_SUCCESS"; // 게시글 삭제 성공
export const BOARD_REMOVE_FAILURE = "BOARD_REMOVE_FAILURE"; // 게시글 삭제 실패

export const LOAD_GROUP_GALLERY_REQUEST = "LOAD_GROUP_GALLERY_REQUEST"; // 모임 갤러리 불러오기 요청
export const LOAD_GROUP_GALLERY_SUCCESS = "LOAD_GROUP_GALLERY_SUCCESS"; // 모임 갤러리  불러오기 성공
export const LOAD_GROUP_GALLERY_FAILURE = "LOAD_GROUP_GALLERY_FAILURE"; // 모임 갤러리  불러오기 실패

export const UPLOAD_GALLERY_IMAGE_REQUEST = "UPLOAD_GALLERY_IMAGE_REQUEST"; // 모임 갤러리 이미지 업로드 요청
export const UPLOAD_GALLERY_IMAGE_SUCCESS = "UPLOAD_GALLERY_IMAGE_SUCCESS"; // 모임 갤러리 이미지 업로드 성공
export const UPLOAD_GALLERY_IMAGE_FAILURE = "UPLOAD_GALLERY_IMAGE_FAILURE"; // 모임 갤러리 이미지 업로드 실패

export const MODIFY_GALLERY_IMAGE_REQUEST = "MODIFY_GALLERY_IMAGE_REQUEST"; // 모임 갤러리 이미지 수정 요청
export const MODIFY_GALLERY_IMAGE_SUCCESS = "MODIFY_GALLERY_IMAGE_SUCCESS"; // 모임 갤러리 이미지 수정 성공
export const MODIFY_GALLERY_IMAGE_FAILURE = "MODIFY_GALLERY_IMAGE_FAILURE"; // 모임 갤러리 이미지 수정 실패

export const REMOVE_GALLERY_IMAGE_REQUEST = "REMOVE_GALLERY_IMAGE_REQUEST"; // 모임 갤러리 이미지 삭제 요청
export const REMOVE_GALLERY_IMAGE_SUCCESS = "REMOVE_GALLERY_IMAGE_SUCCESS"; // 모임 갤러리 이미지 삭제 성공
export const REMOVE_GALLERY_IMAGE_FAILURE = "REMOVE_GALLERY_IMAGE_FAILURE"; // 모임 갤러리 이미지 삭제 실패

export const CREATE_BOARD_COMMENT_REQUEST = "CREATE_BOARD_COMMENT_REQUEST"; // 게시글 댓글 작성 요청
export const CREATE_BOARD_COMMENT_SUCCESS = "CREATE_BOARD_COMMENT_SUCCESS"; // 게시글 댓글 작성 성공
export const CREATE_BOARD_COMMENT_FAILURE = "CREATE_BOARD_COMMENT_FAILURE"; // 게시글 댓글 작성 실패

export const REMOVE_BOARD_COMMENT_REQUEST = "REMOVE_BOARD_COMMENT_REQUEST"; // 게시글 댓글 삭제 요청
export const REMOVE_BOARD_COMMENT_SUCCESS = "REMOVE_BOARD_COMMENT_SUCCESS"; // 게시글 댓글 삭제 성공
export const REMOVE_BOARD_COMMENT_FAILURE = "REMOVE_BOARD_COMMENT_FAILURE"; // 게시글 댓글 삭제 실패

export const MODIFY_BOARD_COMMENT_REQUEST = "MODIFY_BOARD_COMMENT_REQUEST"; // 게시글 댓글 수정 요청
export const MODIFY_BOARD_COMMENT_SUCCESS = "MODIFY_BOARD_COMMENT_SUCCESS"; // 게시글 댓글 수정 성공
export const MODIFY_BOARD_COMMENT_FAILURE = "MODIFY_BOARD_COMMENT_FAILURE"; // 게시글 댓글 수정 실패

export const REPLY_BOARD_COMMENT_REQUEST = "REPLY_BOARD_COMMENT_REQUEST"; // 게시글 대댓글 수정 요청
export const REPLY_BOARD_COMMENT_SUCCESS = "REPLY_BOARD_COMMENT_SUCCESS"; // 게시글 대댓글 수정 성공
export const REPLY_BOARD_COMMENT_FAILURE = "REPLY_BOARD_COMMENT_FAILURE"; // 게시글 대댓글 수정 실패

export const LOAD_MAIN_SCHEDULES_REQUEST = "LOAD_MAIN_SCHEDULES_REQUEST"; // 모임 일정 불러오기 요청
export const LOAD_MAIN_SCHEDULES_SUCCESS = "LOAD_MAIN_SCHEDULES_SUCCESS"; // 모임 일정 불러오기 성공
export const LOAD_MAIN_SCHEDULES_FAILURE = "LOAD_MAIN_SCHEDULES_FAILURE"; // 모임 일정 불러오기 실패

export const LOAD_GROUP_SCHEDULE_REQUEST = "LOAD_GROUP_SCHEDULE_REQUEST"; // 모임 일정 불러오기 요청
export const LOAD_GROUP_SCHEDULE_SUCCESS = "LOAD_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 불러오기 성공
export const LOAD_GROUP_SCHEDULE_FAILURE = "LOAD_GROUP_SCHEDULE_FAILURE"; // 모임 일정 불러오기 실패

export const CREATE_GROUP_SCHEDULE_REQUEST = "CREATE_GROUP_SCHEDULE_REQUEST"; // 모임 일정 등록 요청
export const CREATE_GROUP_SCHEDULE_SUCCESS = "CREATE_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 등록 성공
export const CREATE_GROUP_SCHEDULE_FAILURE = "CREATE_GROUP_SCHEDULE_FAILURE"; // 모임 일정 등록 실패

export const MODIFY_GROUP_SCHEDULE_REQUEST = "MODIFY_GROUP_SCHEDULE_REQUEST"; // 모임 일정 수정 요청
export const MODIFY_GROUP_SCHEDULE_SUCCESS = "MODIFY_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 수정 성공
export const MODIFY_GROUP_SCHEDULE_FAILURE = "MODIFY_GROUP_SCHEDULE_FAILURE"; // 모임 일정 수정 실패

export const REMOVE_GROUP_SCHEDULE_REQUEST = "REMOVE_GROUP_SCHEDULE_REQUEST"; // 모임 일정 삭제 요청
export const REMOVE_GROUP_SCHEDULE_SUCCESS = "REMOVE_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 삭제 성공
export const REMOVE_GROUP_SCHEDULE_FAILURE = "REMOVE_GROUP_SCHEDULE_FAILURE"; // 모임 일정 삭제 실패

export const ATTEND_GROUP_SCHEDULE_REQUEST = "ATTEND_GROUP_SCHEDULE_REQUEST"; // 모임 일정 참석 요청
export const ATTEND_GROUP_SCHEDULE_SUCCESS = "ATTEND_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 참석 성공
export const ATTEND_GROUP_SCHEDULE_FAILURE = "ATTEND_GROUP_SCHEDULE_FAILURE"; // 모임 일정 참석 실패

export const ABSENT_GROUP_SCHEDULE_REQUEST = "ABSENT_GROUP_SCHEDULE_REQUEST"; // 모임 일정 참석취소 요청
export const ABSENT_GROUP_SCHEDULE_SUCCESS = "ABSENT_GROUP_SCHEDULE_SUCCESS"; // 모임 일정 참석취소 성공
export const ABSENT_GROUP_SCHEDULE_FAILURE = "ABSENT_GROUP_SCHEDULE_FAILURE"; // 모임 일정 참석취소 실패

export const LOAD_BOARD_CONTENT = "LOAD_BOARD_CONTENT"; // 게시판 내용

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP_REQUEST: {
      return {
        ...state,
        mainGroups: ""
      };
    }
    case CREATE_GROUP_SUCCESS: {
      return {
        ...state,
        mainGroups: [...state.mainGroups, action.data],
        groupImages: []
        // groupDetail: dummyData
      };
    }
    case CREATE_GROUP_FAILURE: {
      return {
        ...state,
        createGroupErrorReason: action.error
      };
    }
    case LOAD_MAIN_GROUPS_REQUEST: {
      return {
        ...state,
        mainGroups: []
      };
    }
    case LOAD_MAIN_GROUPS_SUCCESS: {
      return {
        ...state,
        mainGroups: action.data
      };
    }
    case LOAD_MAIN_GROUPS_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_SEARCH_GROUPS_REQUEST: {
      return {
        ...state,
        searchGroups: action.lastId ? state.searchGroups : [],
        hasMoreItem: action.lastId ? state.hasMoreItem : true
      };
    }
    case LOAD_SEARCH_GROUPS_SUCCESS: {
      return {
        ...state,
        searchGroups: state.searchGroups.concat(action.data),
        hasMoreItem: action.data.length === 10
      };
    }
    case LOAD_SEARCH_GROUPS_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_SEARCH_SCHEDULES_REQUEST: {
      return {
        ...state,
        searchSchedules: action.lastDate ? state.searchSchedules : [],
        hasMoreItem: action.lastDate ? state.hasMoreItem : true
      };
    }
    case LOAD_SEARCH_SCHEDULES_SUCCESS: {
      return {
        ...state,
        searchSchedules: state.searchSchedules.concat(action.data),
        hasMoreItem: action.data.length === 10
      };
    }
    case LOAD_SEARCH_SCHEDULES_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_GROUP_INTRO_REQUEST: {
      return {
        ...state,
        groupDetail: []
      };
    }
    case LOAD_GROUP_INTRO_SUCCESS: {
      return {
        ...state,
        groupDetail: action.data
      };
    }
    case LOAD_GROUP_INTRO_FAILURE: {
      return {
        ...state
      };
    }
    case GROUP_MEMBER_JOIN_REQUEST: {
      return {
        ...state
      };
    }
    case GROUP_MEMBER_JOIN_SUCCESS: {
      return {
        ...state,
        groupDetail: {
          ...state.groupDetail,
          Members: [...state.groupDetail.Members, action.data]
        }
      };
    }
    case GROUP_MEMBER_JOIN_FAILURE: {
      return {
        ...state
      };
    }
    case GROUP_MEMBER_LEAVE_REQUEST: {
      return {
        ...state
      };
    }
    case GROUP_MEMBER_LEAVE_SUCCESS: {
      // const memberList = state
      const members = state.groupDetail.Members.filter(
        member => member.id !== action.data
      );
      return {
        ...state,
        groupDetail: {
          ...state.groupDetail,
          Members: members
        }
      };
    }
    case GROUP_MEMBER_LEAVE_FAILURE: {
      return {
        ...state
      };
    }
    case BOARD_WRITE_REQUEST: {
      return {
        ...state
      };
    }
    case BOARD_WRITE_SUCCESS: {
      return {
        ...state
        // boardList: [...action.data, ...state.boardList]
        // groupDetail: dummyData
      };
    }
    case BOARD_WRITE_FAILURE: {
      return {
        ...state,
        writeBoardErrorReason: action.error
      };
    }
    case BOARD_MODIFY_REQUEST: {
      return {
        ...state
      };
    }
    case BOARD_MODIFY_SUCCESS: {
      return {
        ...state
        // boardList: [...action.data, ...state.boardList]
        // groupDetail: dummyData
      };
    }
    case BOARD_MODIFY_FAILURE: {
      return {
        ...state
      };
    }
    case BOARD_REMOVE_REQUEST: {
      return {
        ...state
      };
    }
    case BOARD_REMOVE_SUCCESS: {
      return {
        ...state
      };
    }
    case BOARD_REMOVE_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_BOARD_LIST_REQUEST: {
      return {
        ...state,
        boardList: [],
        boardPage: 1
      };
    }
    case LOAD_BOARD_LIST_SUCCESS: {
      return {
        ...state,
        boardList: action.data,
        boardPage: action.page
      };
    }
    case LOAD_BOARD_LIST_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_BOARD_DETAIL_REQUEST: {
      return {
        ...state,
        boardInfo: []
      };
    }
    case LOAD_BOARD_DETAIL_SUCCESS: {
      return {
        ...state,
        boardInfo: action.data
      };
    }
    case LOAD_BOARD_DETAIL_FAILURE: {
      return {
        ...state
      };
    }
    case CREATE_BOARD_COMMENT_REQUEST: {
      return {
        ...state
      };
    }
    case CREATE_BOARD_COMMENT_SUCCESS: {
      return {
        ...state,
        boardInfo: {
          ...state.boardInfo,
          Comments: [...state.boardInfo.Comments, action.data]
        }
      };
    }
    case CREATE_BOARD_COMMENT_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_BOARD_COMMENT_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_BOARD_COMMENT_SUCCESS: {
      const comments = state.boardInfo.Comments.filter(
        comment => comment.id != action.data
      );
      return {
        ...state,
        boardInfo: {
          ...state.boardInfo,
          Comments: comments
        }
      };
    }
    case REMOVE_BOARD_COMMENT_FAILURE: {
      return {
        ...state
      };
    }
    case MODIFY_BOARD_COMMENT_REQUEST: {
      return {
        ...state
      };
    }
    case MODIFY_BOARD_COMMENT_SUCCESS: {
      // 수정하는 댓글의 index 찾기
      const commentIndex = state.boardInfo.Comments.findIndex(
        comment => comment.id == action.data.id
      );
      const comment = state.boardInfo.Comments[commentIndex];
      comment.content = action.data.content;
      return {
        ...state,
        boardInfo: {
          ...state.boardInfo
          // Comments: [...state.boardInfo.Comments, action.data]
        }
      };
    }
    case MODIFY_BOARD_COMMENT_FAILURE: {
      return {
        ...state
      };
    }
    case REPLY_BOARD_COMMENT_REQUEST: {
      return {
        ...state
      };
    }
    case REPLY_BOARD_COMMENT_SUCCESS: {
      return {
        ...state,
        boardInfo: {
          ...state.boardInfo,
          Comments: [...state.boardInfo.Comments, action.data]
        }
      };
    }
    case REPLY_BOARD_COMMENT_FAILURE: {
      return {
        ...state
      };
    }
    case UPLOAD_GROUP_IMAGE_REQUEST: {
      return {
        ...state,
        loadGroupImageErrorReason: ""
      };
    }
    case UPLOAD_GROUP_IMAGE_SUCCESS: {
      return {
        ...state,
        groupImages: [...state.groupImages, ...action.data]
      };
    }
    case UPLOAD_GROUP_IMAGE_FAILURE: {
      return {
        ...state,
        loadGroupImageErrorReason: action.error
      };
    }
    case REMOVE_GROUP_IMAGE: {
      return {
        ...state,
        groupImages: state.groupImages.filter((v, i) => i !== action.index)
      };
    }
    case LOAD_GROUP_GALLERY_REQUEST: {
      return {
        ...state,
        galleryList: action.lastId ? state.galleryList : [],
        hasMoreItem: action.lastId ? state.hasMoreItem : true
      };
    }
    case LOAD_GROUP_GALLERY_SUCCESS: {
      return {
        ...state,
        galleryList: state.galleryList.concat(action.data),
        hasMoreItem: action.data.length === 8
      };
    }
    case LOAD_GROUP_GALLERY_FAILURE: {
      return {
        ...state
      };
    }
    case UPLOAD_GALLERY_IMAGE_REQUEST: {
      return {
        ...state,
        loadGalleryImageErrorReason: ""
      };
    }
    case UPLOAD_GALLERY_IMAGE_SUCCESS: {
      return {
        ...state,
        galleryList: [...action.data, ...state.galleryList]
      };
    }
    case UPLOAD_GALLERY_IMAGE_FAILURE: {
      return {
        ...state,
        loadGalleryImageErrorReason: action.error
      };
    }
    case MODIFY_GALLERY_IMAGE_REQUEST: {
      return {
        ...state
      };
    }
    case MODIFY_GALLERY_IMAGE_SUCCESS: {
      const imageIndex = state.galleryList.findIndex(
        v => v.id === action.data.id
      );
      const galleryList = [...state.galleryList];
      galleryList[imageIndex] = action.data;

      return {
        ...state,
        galleryList
      };
    }
    case MODIFY_GALLERY_IMAGE_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_GALLERY_IMAGE_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_GALLERY_IMAGE_SUCCESS: {
      return {
        ...state,
        galleryList: state.galleryList.filter(v => v.id !== action.data)
        // galleryList: [{ imagePath: action.data }, ...state.galleryList]
      };
    }
    case REMOVE_GALLERY_IMAGE_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_MAIN_SCHEDULES_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_MAIN_SCHEDULES_SUCCESS: {
      return {
        ...state,
        mainSchedules: action.data
      };
    }
    case LOAD_MAIN_SCHEDULES_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state,
        scheduleList: action.lastDate ? state.scheduleList : [],
        hasMoreItem: action.lastDate ? state.hasMoreItem : true
      };
    }
    case LOAD_GROUP_SCHEDULE_SUCCESS: {
      return {
        ...state,
        scheduleList: state.scheduleList.concat(action.data),
        hasMoreItem: action.data.length === 10
      };
    }
    case LOAD_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case CREATE_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state
      };
    }
    case CREATE_GROUP_SCHEDULE_SUCCESS: {
      const data = [action.data, ...state.scheduleList];
      const result = data.sort(date_descending);
      function date_descending(a, b) {
        var dateA = new Date(a["date"]).getTime();
        var dateB = new Date(b["date"]).getTime();
        return dateA < dateB ? 1 : -1;
      }
      return {
        ...state,
        scheduleList: result
      };
    }
    case CREATE_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case MODIFY_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state
      };
    }
    case MODIFY_GROUP_SCHEDULE_SUCCESS: {
      const scheduleIndex = state.scheduleList.findIndex(
        v => v.id === action.data.id
      );
      const scheduleList = [...state.scheduleList];
      scheduleList[scheduleIndex] = action.data;

      const result = scheduleList.sort(date_descending);
      function date_descending(a, b) {
        var dateA = new Date(a["date"]).getTime();
        var dateB = new Date(b["date"]).getTime();
        return dateA < dateB ? 1 : -1;
      }
      return {
        ...state,
        scheduleList: scheduleList
      };
    }
    case MODIFY_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_GROUP_SCHEDULE_SUCCESS: {
      const schedules = state.scheduleList.filter(
        schedule => schedule.id != action.data
      );
      return {
        ...state,
        scheduleList: schedules
      };
    }
    case REMOVE_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case ATTEND_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state
      };
    }
    case ATTEND_GROUP_SCHEDULE_SUCCESS: {
      // 일정 index  찾기
      const scheduleIndex = state.scheduleList.findIndex(
        v => v.id == action.data.scheduleId
      );
      const scheduleList = [...state.scheduleList];
      scheduleList[scheduleIndex].Attends = [
        ...scheduleList[scheduleIndex].Attends,
        action.data.user
      ];
      // console.log("scheduleList", scheduleList[scheduleIndex]);
      // console.log("scheduleList.Attends:", scheduleList[scheduleIndex].Attends);
      return {
        ...state,
        scheduleList: scheduleList
      };
    }
    case ATTEND_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case ABSENT_GROUP_SCHEDULE_REQUEST: {
      return {
        ...state
      };
    }
    case ABSENT_GROUP_SCHEDULE_SUCCESS: {
      // 일정 index  찾기
      const scheduleIndex = state.scheduleList.findIndex(
        v => v.id == action.data.scheduleId
      );

      const scheduleList = [...state.scheduleList];
      const members = state.scheduleList[scheduleIndex].Attends.filter(
        member => member.id != action.data.userId
      );
      scheduleList[scheduleIndex].Attends = members;

      return {
        ...state,
        scheduleList: scheduleList
      };
    }
    case ABSENT_GROUP_SCHEDULE_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_BOARD_CONTENT: {
      return {
        ...state,
        boardContent: action.data
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
