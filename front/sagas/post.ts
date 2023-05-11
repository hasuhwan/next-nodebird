import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { postActions } from "../reducers/post";
import { userActions } from "../reducers/user";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put(postActions.addPostSuccess(result.data));
    yield put(userActions.addPostToMe(result.data.id));
  } catch (err) {
    yield put(postActions.addPostFailure(err.response.data));
  }
}
function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.payload?.lastId);
    yield put(postActions.loadPostsSuccess(result.data));
  } catch (err) {
    yield put(postActions.loadPostsFailure(err.response.data));
  }
}
function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put(postActions.loadPostSuccess(result.data));
  } catch (err) {
    yield put(postActions.loadPostFailure(err.response.data));
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.payload);
    yield put(postActions.removePostSuccess(result.data));
    yield put(userActions.removePostOfMe(result.data));
  } catch (err) {
    yield put(postActions.removePostFailure(err.response.data));
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data); //POST /post/1/comment
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put(postActions.addCommentSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(postActions.addCommentFailure(err.response.data));
  }
}
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.payload);
    yield put(postActions.likePostSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(postActions.likePostFailure(err.response.data));
  }
}
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.payload);
    yield put(postActions.unlikePostSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(postActions.unlikePostFailure(err.response.data));
  }
}
function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.payload);
    yield put(postActions.uploadImagesSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(postActions.uploadImagesFailure(err.response.data));
  }
}
function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.payload);
    yield put(postActions.retweetSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(postActions.retweetFailure(err.response.data));
  }
}
//takeLatest는 응답을 취소한다. 요청을 취소하는 것이 아니다. 따라서 서버에서 같은 내용의 데이터가 연달아 들어왔는지 확인해야 한다.
function* watchRetweet() {
  yield takeLatest(postActions.retweetRequest, retweet);
}
function* watchAddPost() {
  yield takeLatest(postActions.addPostRequest, addPost);
}
function* watchLoadPosts() {
  yield takeLatest(postActions.loadPostsRequest, loadPosts);
}
function* watchLoadPost() {
  yield takeLatest(postActions.loadPostRequest, loadPost);
}
function* watchRemovePost() {
  yield takeLatest(postActions.removePostRequest, removePost);
}
function* watchAddComment() {
  yield takeLatest(postActions.addCommentRequest, addComment);
}
function* watchLikePost() {
  yield takeLatest(postActions.likePostRequest, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(postActions.unlikePostRequest, unlikePost);
}
function* watchUploadImages() {
  yield takeLatest(postActions.uploadImagesRequest, uploadImages);
}
export default function* postSaga() {
  yield all([
    fork(watchRetweet),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
