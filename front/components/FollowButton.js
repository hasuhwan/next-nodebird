import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../reducers/user";
const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const isFollowing = me?.Followings.find((el) => el.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(userActions.unfollowRequest(post.User.id));
    } else {
      dispatch(userActions.followRequest(post.User.id));
    }
  }, [isFollowing]);
  if (post.User.id === me.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};
export default FollowButton;
