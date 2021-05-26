import React from 'react';
import styled from 'styled-components';
import { addComma } from '../../../util/function/SharedFunction';

const EditProduct = ({
  name,
  category,
  price,
  img,
  stock,
  editClick,
  id,
  deleteClick,
}) => {
  return (
    <ProductDiv>
      <ProductInfo>
        <Img src={img} />
        <ProductBasic>
          <H4>{name}</H4>
          <Category>{category}</Category>
          <Price>￦{addComma(price)}</Price>
        </ProductBasic>
        <ProductOption>
          <H5>옵션</H5>
          <ProductOptionDiv>
            <div>재고 : {stock}</div>
          </ProductOptionDiv>
        </ProductOption>
      </ProductInfo>
      <ButtonDiv>
        <EditButton onClick={() => editClick(id)}>수정</EditButton>
        <DeleteButton onClick={() => deleteClick(id)}>삭제</DeleteButton>
      </ButtonDiv>
    </ProductDiv>
  );
};

export default EditProduct;

const ProductDiv = styled.div`
  ${props => props.theme.whiteBox};
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const Img = styled.img`
  width: 100%;
`;

const ProductBasic = styled.div`
  margin-top: 10px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const H4 = styled.h4`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 5px;
`;

const Category = styled.p`
  font-size: 12px;
  padding-bottom: 5px;
`;

const Price = styled.p`
  font-size: 14px;
  padding-bottom: 5px;
  font-weight: 600;
`;

const ProductOption = styled.div`
  padding-top: 5px;
`;

const H5 = styled.h5`
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 5px;
`;

const ProductOptionDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding-bottom: 5px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditButton = styled.button`
  border: none;
  width: 100%;
  background-color: black;
  color: white;
  padding: 5px 0;
  margin-bottom: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  border: none;
  width: 100%;
  padding: 5px 0;
  background-color: firebrick;
  color: #fff;
  cursor: pointer;
`;
