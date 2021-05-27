/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const MenuBox = styled.ul`
  position: fixed;
  top: 300px;
  left: 50px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Category = styled(Link)`
  text-decoration: none;
  color: black;
  margin-bottom: 20px;
  &:hover{
    color: #a09f9f;
  }
`;

export default function CategoryMenu() {
  const data = ['all','outer','top','bottom']

  const showCategory = () =>{
    data.map((item)=>{
      return (
        <Category to={`/shop/category/${item}`} >
          {item}
        </Category>
    )});
  }

  return (
    <MenuBox>
      {data.map((item,index)=>{
        return (
          <Category key={index} to={`/shop/category/${item}`} >
            {item}
          </Category>
      )})}
    </MenuBox>
  );
}
