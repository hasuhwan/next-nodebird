import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../reducers/post";
import type { RootState } from "../store/configureStore";
const CommentForm = ({ post }) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);
  const onSubmitComment = useCallback(() => {
    dispatch(
      postActions.addCommentRequest({
        content: commentText,
        postId: post.id,
        userId: id,
      })
    );
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
