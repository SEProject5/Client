import React from "react";
import styled from "styled-components";
import Slide from "../components/Home/Slide";
import Search from '../components/Home/Search';
import Category from '../components/Common/CategoryMenu';
import ItemList from '../components/Home/ItemList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = ({ }) => {
    return (
      <Main>
        <Category/>
        <MainWrapper>
            <Slide />
            <Section>
              <Search />
            </Section>
            <ItemList />
        </MainWrapper>
      </Main>
    )
}


  
  const Main = styled.div`
      max-width: 1000px;
      margin: 0 auto;
      width: 100%; 
      margin-bottom: 30px;
  `;
  
  const MainWrapper = styled.div`
      padding: 0 50px;
      @media (max-width: 600px) {
          padding: 0;
      }
  `;
  
  const Section = styled.section`
    margin-top: 50px;
  `;

  
export default Home;

