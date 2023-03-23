export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: { id: 1, nickname: "하수환" },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Image: [
        {
          src: "https://66challenge.shop/_next/image?url=http%3A%2F%2Fchallenge66.file.bucket.s3.ap-northeast-2.amazonaws.com%2Fimages%2Fb28812ce-8b03-416c-b074-7ec49e583908.jpeg&w=1080&q=75",
        },
        {
          src: "https://66challenge.shop/_next/image?url=http%3A%2F%2Fchallenge66.file.bucket.s3.ap-northeast-2.amazonaws.com%2Fimages%2Faa4145a9-1f0d-4a20-937d-cddf4627e9e7.jpeg&w=1080&q=75",
        },
        {
          src: "https://66challenge.shop/_next/image?url=http%3A%2F%2Fchallenge66.file.bucket.s3.ap-northeast-2.amazonaws.com%2Fimages%2Fa89ab69e-89d1-4c40-8866-9f7b7ed883da.jpeg&w=1080&q=75",
        },
      ],
      Comments: [
        {
          User: { nickname: "기메지" },
          content: "우와",
        },
        {
          User: { nickname: "박지수" },
          content: "우와2",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};
const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "하수환",
  },
  Image: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
