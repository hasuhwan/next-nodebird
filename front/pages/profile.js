import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import React from "react";
import Head from "next/head";
const Profile = () => {
  const followerList = [
    { nickname: "하수환" },
    { nickname: "김예지" },
    { nickname: "박지수" },
  ];
  const followeingList = [
    { nickname: "하수환" },
    { nickname: "김예지" },
    { nickname: "박지수" },
  ];
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followeingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
