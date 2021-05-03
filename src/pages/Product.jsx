import React from "react";
import styled from "styled-components";
import Category from '../components/Common/CategoryMenu';
import ProductContainer from '../components/Product/ProductContainer';

const Product = ({ }) => {
    return (
      <Main>
        <Category />
        <MainWrapper>
          <ProductContainer />
        </MainWrapper>
      </Main>
    )
}

const H4 = styled.h4`
    font-size: 32px;
    font-weight: 600;
    text-align: center;
`;
  
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

const Section = styled.section``;

  
export default Product;

