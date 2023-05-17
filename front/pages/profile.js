import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userActions } from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  // const { data: followersData, error: followerError } = useSWR(
  //   "http://localhost:3065/user/followers",
  //   fetcher
  // );
  // const { data: followingsData, error: followingError } = useSWR(
  //   "http://localhost:3065/user/followings",
  //   fetcher
  // );

  useEffect(() => {
    dispatch(userActions.loadFollowersRequest());
    dispatch(userActions.loadFollowingsRequest());
  }, []);
  useEffect(() => {
    if (!(me && me.id)) {
      router.replace("/");
    }
  }, [me && me.id]);
  if (!me) {
    return "내 정보 로딩중";
  }
  // if (followerError || followingError) {
  //   console.error(followerError || followingError);
  //   return "팔로잉/팔로워 로딩 중 에러가 발생";
  // }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req?.headers.cookie;
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch(userActions.loadMyInfoRequest());
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
export default Profile;
