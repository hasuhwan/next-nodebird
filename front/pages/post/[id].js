import { useRouter } from "next/router";
import { userActions } from "../../reducers/user";
import { postActions } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { useSelector } from "react-redux";
import Head from "next/head";
const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  console.log(singlePost);
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : "favicon.ico"
          }
        />
        <meta property="og:url" content={`https://66challenge.shop`} />
      </Head>
      <PostCard post={singlePost}></PostCard>
    </AppLayout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, query }) => {
      const cookie = req?.headers.cookie;
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch(userActions.loadMyInfoRequest());
      store.dispatch(postActions.loadPostRequest(params.id));
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
export default Post;
