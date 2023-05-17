import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const observer = useRef();
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImageZoom(false);
  });
  useEffect(() => {
    observer.current = new IntersectionObserver(intersertionObserver, {
      threshold: 1,
    });
    imgRef.current && observer.current.observe(imgRef.current);
  });
  const intersertionObserver = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        setLoaded(true);
      }
    },
    [loaded]
  );
  if (images.length === 1) {
    return (
      <>
        <img
          ref={imgRef}
          role="presentation"
          src={
            loaded ? `http://localhost:3065/${images[0].src}` : "/vercel.svg"
          }
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={
            loaded ? `http://localhost:3065/${images[0].src}` : "/vercel.svg"
          }
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={
            loaded ? `http://localhost:3065/${images[0].src}` : "/vercel.svg"
          }
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={
            loaded ? `http://localhost:3065/${images[0].src}` : "/vercel.svg"
          }
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};
PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
