import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export const initialState = {
  singlePost: null,
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loadPostRequest(state, action: PayloadAction) {
      state.loadPostLoading = true;
      state.loadPostDone = false;
      state.loadPostError = null;
    },
    loadPostSuccess(state, action: PayloadAction) {
      state.loadPostLoading = false;
      state.loadPostDone = true;
      state.singlePost = action.payload;
    },
    loadPostFailure(state, action: PayloadAction) {
      state.loadPostLoading = false;
      state.loadPostError = action.payload;
    },
    loadPostsRequest(state, action: PayloadAction) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state, action: PayloadAction) {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 10;
    },
    loadPostsFailure(state, action: PayloadAction) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    },
    likePostRequest(state, action: PayloadAction) {
      state.likePostLoading = true;
      state.likePostDone = false;
      state.likePostError = null;
    },
    likePostSuccess(state, action: PayloadAction) {
      const post = state.mainPosts.find(
        (el) => el.id === action.payload.PostId
      );
      console.log(action.payload);
      post.Likers.push({ id: action.payload.UserId });
      state.likePostLoading = false;
      state.likePostDone = true;
    },
    likePostFailure(state, action: PayloadAction) {
      state.likePostLoading = false;
      state.likePostError = action.payload;
    },
    unlikePostRequest(state, action: PayloadAction) {
      state.unlikePostLoading = true;
      state.unlikePostDone = false;
      state.unlikePostError = null;
    },
    unlikePostSuccess(state, action: PayloadAction) {
      const post = state.mainPosts.find(
        (el) => el.id === action.payload.PostId
      );
      post.Likers = post.Likers.filter((el) => el.id !== action.payload.UserId);
      state.unlikePostLoading = false;
      state.unlikePostDone = true;
    },
    unlikePostFailure(state, action: PayloadAction) {
      state.unlikePostLoading = false;
      state.unlikePostError = action.payload;
    },
    addPostRequest(state, action: PayloadAction) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess(state, action: PayloadAction) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift(action.payload);
      state.imagePaths = [];
    },
    addPostFailure(state, action: PayloadAction) {
      state.addPostLoading = false;
      state.addPostError = action.payload;
    },
    removePostRequest(state, action: PayloadAction) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },
    removePostSuccess(state, action: PayloadAction) {
      state.removePostLoading = false;
      state.removePostDone = true;
      state.mainPosts = state.mainPosts.filter(
        (el) => el.id !== action.payload.PostId
      );
    },
    removePostFailure(state, action: PayloadAction) {
      state.removePostLoading = false;
      state.removePostError = action.payload;
    },
    addCommentRequest(state, action: PayloadAction) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess(state, action: PayloadAction) {
      const post = state.mainPosts.find(
        (el) => el.id === action.payload.PostId
      );
      post.Comments.unshift(action.payload);
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },
    addCommentFailure(state, action: PayloadAction) {
      state.addCommentLoading = false;
      state.addCommentError = action.payload;
    },
    uploadImagesRequest(state, action: PayloadAction) {
      state.uploadImagesLoading = true;
      state.uploadImagesDone = false;
      state.uploadImagesError = null;
    },
    uploadImagesSuccess(state, action: PayloadAction) {
      state.imagePaths = action.payload;
      state.uploadImagesLoading = false;
      state.uploadImagesDone = true;
    },
    uploadImagesFailure(state, action: PayloadAction) {
      state.uploadImagesLoading = false;
      state.uploadImagesError = action.payload;
    },
    retweetRequest(state, action: PayloadAction) {
      state.retweetLoading = true;
      state.retweetDone = false;
      state.retweetError = null;
    },
    retweetSuccess(state, action: PayloadAction) {
      state.retweetLoading = false;
      state.retweetDone = true;
      state.mainPosts.unshift(action.payload);
    },
    retweetFailure(state, action: PayloadAction) {
      state.retweetLoading = false;
      state.retweetError = action.payload;
    },
    removeImage(state, action: PayloadAction) {
      console.log(action.payload);
      state.imagePaths = state.imagePaths.filter(
        (el, i) => i !== action.payload
      );
    },
  },
});
export const postActions = postSlice.actions;
export default postSlice.reducer;
