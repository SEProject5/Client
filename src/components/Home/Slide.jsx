import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import NoticeData from '../../dummyData/NoticeData.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../lib/api/useFetch";

const Slide = ({ }) => {
    //order=2인 경우, 진행 중인 배너만 호출함
    const {loading, data, error} = useFetch('/banner?order=2');
    return (
      <Section>
          <Slider {...settings}>
              {data ?
                (data.map((data, index) => {
                  return (
                  <SliderDiv key={data.id}>
                      <img src={data.url} alt={index} />
                  </SliderDiv>
                  )}))
                :
                (NoticeData.map((data, index) => {
                  return (
                  <SliderDiv key={data.id}>
                      <img src={data.url} alt={index} />
                  </SliderDiv>
                )}))
              }
          </Slider>
      </Section>
    )
}


const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                arrows: false
            }
        }
    ]
  }

  const SliderDiv = styled.div`
      height: 70vh;
      img {
          width: 100%;
          height: 100%;
      }
      @media (max-width: 600px) {
          height: 30vh;
      }
  `;
  const Section = styled.section`
    margin: 50px auto;
  `;

  
export default Slide;

