import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loadPostsRequest(state, action: PayloadAction) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state, action: PayloadAction) {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = state.mainPosts.length < 50;
    },
    loadPostsFailure(state, action: PayloadAction) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
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
        (el) => el.id !== action.payload
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
  },
});
export const postActions = postSlice.actions;
export default postSlice.reducer;
