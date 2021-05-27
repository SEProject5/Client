import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import client from '../../lib/api/client';
import ItemData from '../../dummyData/ItemData.json';
import ItemCard from "../Common/ItemCard";
import {withRouter} from 'react-router-dom';

const NewItemList = ({ match, history }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get(`/product`);
        setData(response.data); 
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  },[]);
  return (
    <>
      <Section>
        <MainTitle>
          <H4>NEW ITEM</H4>
        </MainTitle>
        <CustomSlider {...itemSettings}>
          {data && data.map((item,index) => {
            if (index > 4) return;
            return (
            <ItemCard
              key={item.p_id}
              imgSrc={item.file}
              title={item.p_name}
              price={item.price}
              id={item.p_id}
            />
          )})}
          {!data && ItemData.map(item => (
            <ItemCard
              key={item.p_id}
              imgSrc={item.file}
              title={item.p_name}
              price={item.price}
              id={item.p_id}
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

export default withRouter(NewItemList);