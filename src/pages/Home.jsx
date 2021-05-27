import React, {useState} from "react";
import styled from "styled-components";
import Slide from "../components/Home/Slide";
import Search from '../components/Home/Search';
import Category from '../components/Common/CategoryMenu';
import NewItemList from '../components/Home/NewItemList';
import SearchItemList from '../components/Home/SearchItemList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = ({ }) => {
  const [data, setData] = useState(null);

    return (
      <Main>
        <Category/>
        <MainWrapper>
            <Slide />
            <Section>
              <Search setData={setData}/>
            </Section>
            {data ? <SearchItemList searchItem={data}/>
            :<NewItemList />
            }
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

