import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ItemData from '../../dummyData/ItemData.json';
import ItemCard from "./ItemCard";

const ItemList = () => {
  return (
    <>
      <Section>
        <MainTitle>
          <H4>NEW ITEM</H4>
        </MainTitle>
        <CustomSlider {...itemSettings}>
          {ItemData.map(item => (
            <ItemCard
              key={item.id}
              imgSrc={item.url}
              title={item.name}
              price={item.price}
              id={item.id}
            />
          ))}
        </CustomSlider>
      </Section>
    </>
  )
}


const itemSettings = {
  dots: false, 
  infinite: false, 
  rows: 4, 
  slidesToShow: 1,
  autoplay: false,
  arrows: false,
  swipe: false,
  responsive: [
      {
          breakpoint: 900, 
          settings: {
              dots: false, 
              infinite: false, 
              rows: 2,
              slidesToShow: 1
          }
      },
      {
          breakpoint: 600,
          settings: {
              dots: true,
              slidesToShow: 3,
              slidesToScroll: 3,
              rows: 1,
              arrows: false,
              swipe: true
          }
      },
      {
          breakpoint: 400, 
          settings: {
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 1,
              arrows: false,
              swipe: true
          }
      }
  ]
}

const MainTitle = styled.div`
    margin-top: 70px;
    border-bottom: ${props => props.theme.borderBottom};
    padding: 20px;
    margin-bottom: 40px;
`;

const H4 = styled.h4`
    font-size: 32px;
    font-weight: 600;
    text-align: center;
`;


const CustomSlider = styled(Slider)`
    @media (min-width: 601px) {
        .slick-slide {
            display: grid; 
            grid-template-columns: repeat(4, 1fr);
            margin-bottom: 30px;
        } 
        .slick-track {
            width: 1000px !important;
        } 
    }
    @media (max-width: 900px) {
        .slick-slide {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .slick-dots {
        position: relative; 
        margin-top: 20px;
    }
    .slick-dots>li>button:before {
        color: black;
    }
`;

const Section = styled.section``;

export default ItemList;