import shortId from "shortid";
import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
faker.seed(123);
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
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((el, idx) => ({
      id: shortId.generate(),
      User: { id: shortId.generate(), nickname: faker.name.firstName() },
      content: faker.lorem.paragraph(),
      Images: [{ src: faker.image.image() }],
      Comments: [
        {
          User: { id: shortId.generate(), nickname: faker.name.firstName() },
          content: faker.lorem.sentence(),
        },
      ],
    }));

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "하수환",
  },
  Images: [],
  Comments: [],
});
const dummyComment = (data) => {
  console.log(data);
  return {
    id: shortId.generate(),
    content: data,
    User: {
      id: 1,
      nickname: "하수환",
    },
  };
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
      state.loadPostsError = action.error;
    },
    addPostRequest(state, action: PayloadAction) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess(state, action: PayloadAction) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift(dummyPost(action.payload));
    },
    addPostFailure(state, action: PayloadAction) {
      state.addPostLoading = false;
      state.addPostError = action.error;
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
      state.removePostError = action.error;
    },
    addCommentRequest(state, action: PayloadAction) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess(state, action: PayloadAction) {
      const post = state.mainPosts.find(
        (el) => el.id === action.payload.postId
      );
      post.Comments.unshift(dummyComment(action.payload.content));
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },
    addCommentFailure(state, action: PayloadAction) {
      state.addCommentLoading = false;
      state.addCommentError = action.error;
    },
  },
});
export const postActions = postSlice.actions;
export default postSlice.reducer;
