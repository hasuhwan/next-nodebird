import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { userActions } from "../reducers/user";
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
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    yield put(userActions.logInSuccess(action.payload));
  } catch (err) {
    yield put(userActions.logInFailure(err.response.data));
  }
}
function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  // const result = yield call(logOutAPI);
  try {
    yield delay(1000);
    yield put(userActions.logOutSuccess());
  } catch (err) {
    yield put(userActions.logOutFailure(err.response.data));
  }
}
function signUpAPI() {
  return axios.post("/api/signup");
}

function* signUp() {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI);
    yield put(userActions.singUpSuccess());
  } catch (err) {
    yield put(userActions.singUpFailure(err.response.data));
  }
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
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
