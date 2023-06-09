import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userActions } from "../reducers/user";
const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch(userActions.unfollowRequest(id));
    } else {
      dispatch(userActions.removeFollowerRequest(id));
    }
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};
FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default FollowList;
