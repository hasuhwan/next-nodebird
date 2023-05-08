import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export const initialState = {
  loadMyInfoLoading: false, //내 정보 가져오기
  loadMyInfoDone: false,
  loadMyInfoError: null,
  followLoading: false, //팔로우 시도 중
  followDone: false,
  followError: null,
  unfollowLoading: false, //언팔로우 시도 중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, //로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, //로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, //회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, //닉네임 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: "hasuhwan",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: "김예지" }, { nickname: "박지수" }],
  Followers: [{ nickname: "김예지" }, { nickname: "박지수" }],
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    followRequest(state, action: PayloadAction) {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    },
    followSuccess(state, action: PayloadAction) {
      state.followLoading = false;
      state.followDone = true;
      state.me.Followings.push({ id: action.payload });
    },
    followFailure(state, action: PayloadAction) {
      console.log(action);
      state.followLoading = false;
      state.followError = action.payload;
    },
    unfollowRequest(state, action: PayloadAction) {
      state.unfollowLoading = true;
      state.unfollowDone = false;
      state.unfollowError = null;
    },
    unfollowSuccess(state, action: PayloadAction) {
      state.unfollowLoading = false;
      state.unfollowDone = true;
      state.me.Followings = state.me.Followings.filter(
        (el) => el.id !== action.payload
      );
    },
    unfollowFailure(state, action: PayloadAction) {
      state.unfollowLoading = false;
      state.unfollowError = action.payload;
    },
    loadMyInfoRequest(state, action: PayloadAction) {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    loadMyInfoSuccess(state, action: PayloadAction) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      state.me = action.payload;
    },
    loadMyInfoFailure(state, action: PayloadAction) {
      console.log(action);
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.payload;
    },
    logInRequest(state, action: PayloadAction) {
      console.log(action);
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = null;
    },
    logInSuccess(state, action: PayloadAction) {
      state.logInLoading = false;
      state.logInDone = true;
      state.me = action.payload;
    },
    logInFailure(state, action: PayloadAction) {
      state.logInLoading = false;
      state.logInError = action.payload;
    },
    logOutRequest(state, action: PayloadAction) {
      state.logOutLoading = true;
      state.logOutDone = false;
      state.logOutError = null;
    },
    logOutSuccess(state) {
      state.logOutLoading = false;
      state.logOutDone = true;
      state.me = null;
    },
    logOutFailure(state, action: PayloadAction) {
      console.log(action);
      state.logOutLoading = false;
      state.logOutError = action.payload;
    },
    singUpRequest(state, action: PayloadAction) {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },
    singUpSuccess(state, action: PayloadAction) {
      state.signUpLoading = false;
      state.signUpDone = true;
    },
    singUpFailure(state, action: PayloadAction) {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },
    changeNicknameRequest(state, action: PayloadAction) {
      state.changeNicknameLoading = true;
      state.changeNicknameDone = false;
      state.changeNicknameError = null;
    },
    changeNicknameSuccess(state, action: PayloadAction) {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
    },
    changeNicknameFailure(state, action: PayloadAction) {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.payload;
    },
    addPostToMe(state, action: PayloadAction) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostOfMe(state, action: PayloadAction) {
      state.me.Posts = state.me.Posts.filter((el) => el.id !== action.payload);
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
