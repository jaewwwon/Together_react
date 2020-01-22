import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MAIN_GROUPS_REQUEST,
  LOAD_MAIN_SCHEDULES_REQUEST
} from "../reducers/group";
import ScheduleItem from "../components/ScheduleItem";
import GroupItemForm from "../components/GroupItemForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Main = styled.div`
  position: relative;
  padding: 122px 15px;
  text-align: center;

  & > img {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & > p:first-child {
    font-size: 42px;
    font-weight: 500;
    color: #fff;
    text-shadow: 0px 3px 3px rgba(45, 64, 114, 0.2);
  }
  & > p + p {
    margin-top: 8px;
    font-size: 20px;
    color: #fff;
  }
  & > a {
    display: inline-block;
    margin-top: 32px;
    padding: 14px 32px;
    background: #f64060;
    border-radius: 4px;
    font-size: 15px;
    color: #fff;
    transition: all 0.25s ease-in-out;
  }
  & > a:hover {
    background-color: #f7183e;
  }
`;
const Section = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 0 42px;
  &:nth-child(2) {
    margin: 62px auto 0;
  }
  & + & {
    margin: 74px auto 70px;
  }
  .slick-slider {
    padding: 0 42px;
    margin: 12px -42px 0;
  }
  .slick-arrow {
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
    background-image: url("http://localhost:3000/btn_left.png");
  }
  .slick-next {
    right: 0;
    background-image: url("http://localhost:3000/btn_right.png");
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
const Title = styled.h2`
  font-size: 32px;
  color: #777;

  & + p {
    margin-top: 5px;
    font-size: 20px;
    color: #777;
  }

  & ~ a {
    position: absolute;
    right: 48px;
    top: 10px;
    font-size: 15px;
  }
  & ~ a:hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  const { mainGroups, mainSchedules } = useSelector(state => state.group);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MAIN_GROUPS_REQUEST
  //   });
  //   dispatch({
  //     type: LOAD_MAIN_SCHEDULES_REQUEST
  //   });
  // }, []);

  const groupSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const scheduleSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <>
      <Main>
        <p>같은 관심사를 함께하는 즐거움!</p>
        <p>공통 관심사를 갖고 있는 사람들을 쉽고 빠르게 찾아보세요.</p>
        <Link href="/formGroup">
          <a>
            원하는 모임이 없으신가요? <span>새로운 모임 만들기</span>
          </a>
        </Link>
        <img src="bg_main.jpg" alt="" />
      </Main>
      <Section>
        <Title>최근 모임 일정</Title>
        <p>곧 진행될 일정을 확인해 보세요.</p>
        <Link href="/search/schedule">
          <a>일정 전체보기 &rarr;</a>
        </Link>
        <Slider {...scheduleSettings}>
          {mainSchedules.length > 0 ? (
            mainSchedules.map(schedule => {
              return <ScheduleItem key={schedule.id} schedule={schedule} />;
            })
          ) : (
            <div>등록된 일정이 없습니다</div>
          )}
        </Slider>
      </Section>
      <Section>
        <Title>최근 오픈된 모임</Title>
        <p>나의 관심분야와 맞는 모임을 찾아보세요.</p>
        <Link href="/search/group">
          <a>모임 전체보기 &rarr;</a>
        </Link>

        <Slider {...groupSettings}>
          {mainGroups.length > 0 ? (
            mainGroups.map(group => {
              return <GroupItemForm key={group.id} group={group} />;
            })
          ) : (
            <div>생성된 모임이 없습니다</div>
          )}
        </Slider>
      </Section>
    </>
  );
};

Home.getInitialProps = async context => {
  // console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_GROUPS_REQUEST
  });
  context.store.dispatch({
    type: LOAD_MAIN_SCHEDULES_REQUEST
  });
};

export default Home;
