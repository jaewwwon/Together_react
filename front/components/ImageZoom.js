import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Header = styled.div`
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
  text-align: center;
  h2 {
    font-weight: 500;
    color: #555;
  }
  input[type="button"] {
    z-index: 2000;
    position: absolute;
    right: 8px;
    top: 10px;
    width: 22px;
    height: 22px;
    background: url("../../btn_close.png") no-repeat 0 0;
    background-size: 100%;
    border: 0;
    cursor: pointer;
  }
`;
const SliderWrap = styled.div`
  margin-top: 64px;
  .slick-list img {
    margin: 0 auto;
  }
  .slick-slider {
  }
  .slick-arrow {
    z-index: 1500;
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    margin-top: -17px;
    background: transparent no-repeat 0 0 / 100%;
    border: 0;
    color: transparent;
  }
  .slick-prev {
    left: 0;
    background-image: url("../../btn_left.png");
  }
  .slick-next {
    right: 0;
    background-image: url("../../btn_right.png");
  }
  .slick-dots {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 12px;
    text-align: center;
  }
  .slick-dots > li {
    display: inline-block;
    margin: 0 6px;
  }
  .slick-dots > li > button {
    width: 10px;
    height: 10px;
    background: #b4b4b4;
    border: 0;
    border-radius: 50%;
    color: transparent;
  }
  .slick-dots > li > button:hover {
    background: #454545;
  }
  .slick-dots > li.slick-active > button {
    background: #454545;
  }
`;
const PageView = styled.div`
  margin: 12px 0;
  text-align: center;
  span {
    display: inline-block;
    padding: 4px 14px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    color: #fff;
    font-size: 13px;
  }
`;

const ImageZoom = ({ images, imageIdx, onCloseImageZoom }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    initialSlide: imageIdx,
    speed: 500,
    afterChange: slide => setCurrentSlide(slide),
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="popup_wrap">
      <Header>
        <h2>상세이미지</h2>
        <input type="button" onClick={onCloseImageZoom} />
      </Header>

      <SliderWrap>
        <Slider {...settings}>
          {images.map(image => {
            return (
              <div key={image.id}>
                <img
                  src={`http://localhost:8080/${image.imagePath}`}
                  alt={image.imagePath}
                />
              </div>
            );
          })}
        </Slider>
      </SliderWrap>
      <PageView>
        <span>
          {currentSlide + 1} / {images.length}
        </span>
      </PageView>
    </div>
  );
};

// ImageZoom.getInitialProps = async context => {
//   console.log(Object.keys(context));
// };

export default ImageZoom;
