import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export const initialState = {
  loadFollowersLoading: false, //내 팔로워 가져오기
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false, //내 팔로잉 가져오기
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadMyInfoLoading: false, //내 정보 가져오기
  loadMyInfoDone: false,
  loadMyInfoError: null,
  followLoading: false, //팔로우 시도 중
  followDone: false,
  followError: null,
  removeFollowerLoading: false, //팔로워 차단
  removeFollowerDone: false,
  removeFollowerError: null,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadFollowersRequest(state, action: PayloadAction<any>) {
      state.loadFollowersLoading = true;
      state.loadFollowersDone = false;
      state.loadFollowersError = null;
    },
    loadFollowersSuccess(state, action: PayloadAction<any>) {
      state.loadFollowersLoading = false;
      state.loadFollowersDone = true;
      state.me.Followers = action.payload;
    },
    loadFollowersFailure(state, action: PayloadAction<any>) {
      state.loadFollowersLoading = false;
      state.loadFollowersError = action.payload;
    },
    loadFollowingsRequest(state, action: PayloadAction<any>) {
      state.loadFollowingsLoading = true;
      state.loadFollowingsDone = false;
      state.loadFollowingsError = null;
    },
    loadFollowingsSuccess(state, action: PayloadAction<any>) {
      state.loadFollowingsLoading = false;
      state.loadFollowingsDone = true;
      state.me.Followings = action.payload;
    },
    loadFollowingsFailure(state, action: PayloadAction<any>) {
      state.loadFollowingsLoading = false;
      state.loadFollowingsError = action.payload;
    },
    followRequest(state, action: PayloadAction) {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    },
    followSuccess(state, action: PayloadAction<any>) {
      state.followLoading = false;
      state.followDone = true;
      state.me.Followings.push({ id: action.payload.UserId });
    },
    followFailure(state, action: PayloadAction<any>) {
      console.log(action);
      state.followLoading = false;
      state.followError = action.payload;
    },
    unfollowRequest(state, action: PayloadAction<any>) {
      state.unfollowLoading = true;
      state.unfollowDone = false;
      state.unfollowError = null;
    },
    unfollowSuccess(state, action: PayloadAction<any>) {
      state.unfollowLoading = false;
      state.unfollowDone = true;
      state.me.Followings = state.me.Followings.filter(
        (el) => el.id !== action.payload.UserId
      );
    },
    unfollowFailure(state, action: PayloadAction<any>) {
      state.unfollowLoading = false;
      state.unfollowError = action.payload;
    },
    removeFollowerRequest(state, action: PayloadAction) {
      state.removeFollowerLoading = true;
      state.removeFollowerDone = false;
      state.removeFollowerError = null;
    },
    removeFollowerSuccess(state, action: PayloadAction<any>) {
      state.removeFollowerLoading = false;
      state.removeFollowerDone = true;
      state.me.Followers = state.me.Followers.filter(
        (el) => el.id !== action.payload.UserId
      );
    },
    removeFollowerFailure(state, action: PayloadAction<any>) {
      state.removeFollowerLoading = false;
      state.removeFollowerError = action.payload;
    },
    loadMyInfoRequest(state, action: PayloadAction) {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    loadMyInfoSuccess(state, action: PayloadAction<any>) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      state.me = action.payload;
    },
    loadMyInfoFailure(state, action: PayloadAction<any>) {
      console.log(action);
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.payload;
    },
    logInRequest(state, action: PayloadAction) {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = null;
    },
    logInSuccess(state, action: PayloadAction<any>) {
      state.logInLoading = false;
      state.logInDone = true;
      state.me = action.payload;
    },
    logInFailure(state, action: PayloadAction<any>) {
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
    logOutFailure(state, action: PayloadAction<any>) {
      console.log(action);
      state.logOutLoading = false;
      state.logOutError = action.payload;
    },
    signUpRequest(state, action: PayloadAction) {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },
    signUpSuccess(state, action: PayloadAction) {
      state.signUpLoading = false;
      state.signUpDone = true;
    },
    signUpFailure(state, action: PayloadAction<any>) {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },
    changeNicknameRequest(state, action: PayloadAction) {
      state.changeNicknameLoading = true;
      state.changeNicknameDone = false;
      state.changeNicknameError = null;
    },
    changeNicknameSuccess(state, action: PayloadAction<any>) {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
      state.me.nickname = action.payload.nickname;
    },
    changeNicknameFailure(state, action: PayloadAction<any>) {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.payload;
    },
    addPostToMe(state, action: PayloadAction<any>) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostOfMe(state, action: PayloadAction<any>) {
      state.me.Posts = state.me.Posts.filter(
        (el) => el.id !== action.payload.PostId
      );
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
