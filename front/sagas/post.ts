import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import shortId from "shortid";
import post, { postActions } from "../reducers/post";
import { userActions } from "../reducers/user";
import { generateDummyPost } from "../reducers/post";
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put(postActions.addPostSuccess({ id, content: action.payload }));
    yield put(userActions.addPostToMe(id));
  } catch (err) {
    yield put(postActions.addPostFailure(err.response.data));
  }
}
function loadPostsAPI(data) {
  return axios.get("/api/post", data);
}

function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield delay(1000);
    yield put(postActions.loadPostsSuccess(generateDummyPost(10)));
  } catch (err) {
    yield put(postActions.loadPostsFailure(err.response.data));
  }
}

function removePostAPI(data) {
  return axios.post("/api/post", data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put(postActions.removePostSuccess(action.payload));
    yield put(userActions.removePostOfMe(action.payload));
  } catch (err) {
    yield put(postActions.removePostFailure(err.response.data));
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put(postActions.addCommentSuccess(action.payload));
  } catch (err) {
    yield put(postActions.addCommentFailure(err.response.data));
  }
}
//takeLatest는 응답을 취소한다. 요청을 취소하는 것이 아니다. 따라서 서버에서 같은 내용의 데이터가 연달아 들어왔는지 확인해야 한다.

function* watchAddPost() {
  yield takeLatest(postActions.addPostRequest, addPost);
}
function* watchLoadPosts() {
  yield takeLatest(postActions.loadPostsRequest, loadPosts);
}
function* watchRemovePost() {
  yield takeLatest(postActions.removePostRequest, removePost);
}
function* watchAddComment() {
  yield takeLatest(postActions.addCommentRequest, addComment);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
