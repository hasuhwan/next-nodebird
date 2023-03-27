import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((el, idx) => {
        if (el.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${el.slice(1)}`} key={idx}>
              {el}
            </Link>
          );
        }
        return el;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
