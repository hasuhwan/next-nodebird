import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { userActions } from "../reducers/user";

function loadMyInfoAPI() {
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
  return axios.post("/api/follow", data);
}

function* follow(action) {
  try {
    yield delay(1000);
    // const result = yield call(followAPI, action.data);
    yield put(userActions.followSuccess(action.payload));
  } catch (err) {
    yield put(userActions.followFailure(err.response.data));
  }
}
function unfollowAPI(data) {
  return axios.post("/api/unfollow", data);
}

function* unfollow(action) {
  try {
    yield delay(1000);
    // const result = yield call(unfollowAPI, action.data);
    yield put(userActions.unfollowSuccess(action.payload));
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
    yield put(userActions.singUpSuccess());
  } catch (err) {
    yield put(userActions.singUpFailure(err.response.data));
  }
}
function* watchLoadMyInfo() {
  yield takeLatest(userActions.loadMyInfoRequest, loadMyInfo);
}
function* watchFollow() {
  yield takeLatest(userActions.followRequest, follow);
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
  yield takeLatest(userActions.singUpRequest, signUp);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
