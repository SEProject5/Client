import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import NoticeData from '../../dummyData/NoticeData.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../lib/api/useFetch";
import {defaultImg} from '../../dummyData/img/defaultImg';


const Slide = ( {imageArr} ) => {

    const handleImgError = (e) => {
    	e.target.src = defaultImg;
    }
    
    return (
      <Section>
          <Slider {...settings}>
            {imageArr && imageArr.map((url, index) => {
                return (
                <SliderDiv key={index}>
                    <Image src={url} alt={'product image'} />
                </SliderDiv>
                )})
            }
          </Slider>
      </Section>
    )
}

const Image = styled.img`
  width:400px;
`;
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
      height: 200px;
      img {
          width: 400px;
      }
  `;
  const Section = styled.section`
  width: 400px;
    margin: 50px auto;
  `;

  
export default Slide;

