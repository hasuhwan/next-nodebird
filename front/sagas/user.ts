import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { userActions } from "../reducers/user";

function loadMyInfoAPI() {
  console.log(axios.get("/user"));
  return axios.get("/user");
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put(userActions.loadMyInfoSuccess(result.data));
  } catch (err) {
    yield put(userActions.loadMyInfoFailure(err.response.data));
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.payload);
    yield put(userActions.followSuccess(result.data));
  } catch (err) {
    yield put(userActions.followFailure(err.response.data));
  }
}
function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.payload);
    yield put(userActions.removeFollowerSuccess(result.data));
  } catch (err) {
    yield put(userActions.removeFollowerFailure(err.response.data));
  }
}
function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.payload);
    yield put(userActions.unfollowSuccess(result.data));
  } catch (err) {
    yield put(userActions.unfollowFailure(err.response.data));
  }
}
function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    console.log(result);
    yield put(userActions.logInSuccess(result.data));
  } catch (err) {
    yield put(userActions.logInFailure(err.response.data));
  }
}
function logOutAPI() {
  return axios.post("user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(userActions.logOutSuccess());
  } catch (err) {
    yield put(userActions.logOutFailure(err.response.data));
  }
}
function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);
    yield put(userActions.signUpSuccess());
  } catch (err) {
    yield put(userActions.signUpFailure(err.response.data));
  }
}
function changeNicknameAPI(data) {
  return axios.patch("/user/nickname", { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.payload);
    yield put(userActions.changeNicknameSuccess(result.data));
  } catch (err) {
    yield put(userActions.changeNicknameFailure(err.response.data));
  }
}
function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.payload);
    yield put(userActions.loadFollowersSuccess(result.data));
  } catch (err) {
    yield put(userActions.loadFollowersFailure(err.response.data));
  }
}
function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.payload);
    yield put(userActions.loadFollowingsSuccess(result.data));
  } catch (err) {
    yield put(userActions.loadFollowingsFailure(err.response.data));
  }
}
function* watchLoadFollowers() {
  yield takeLatest(userActions.loadFollowersRequest, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(userActions.loadFollowingsRequest, loadFollowings);
}
function* watchChangeNickname() {
  yield takeLatest(userActions.changeNicknameRequest, changeNickname);
}
function* watchLoadMyInfo() {
  yield takeLatest(userActions.loadMyInfoRequest, loadMyInfo);
}
function* watchFollow() {
  yield takeLatest(userActions.followRequest, follow);
}
function* watchRemoveFollower() {
  yield takeLatest(userActions.removeFollowerRequest, removeFollower);
}
function* watchUnfollow() {
  yield takeLatest(userActions.unfollowRequest, unfollow);
}
function* watchLogin() {
  yield takeLatest(userActions.logInRequest, logIn);
}
function* watchLogOut() {
  yield takeLatest(userActions.logOutRequest, logOut);
}
function* watchSignUp() {
  yield takeLatest(userActions.signUpRequest, signUp);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchRemoveFollower),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
