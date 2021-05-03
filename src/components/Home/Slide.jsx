import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import HomeSlideData from '../../dummyData/HomeSlideData.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Slide = ({ }) => {
    return (
      <Section>
          <Slider {...settings}>
              {HomeSlideData.map((data, index) => (
                  <SliderDiv key={data.id}>
                      <img src={data.url} alt={index} />
                  </SliderDiv>
              ))}
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
      height: 50vh;
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

