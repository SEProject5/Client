import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <HeaderBlock>
      <h1>Header 영역</h1>
      <MenuList>
        <MenuItem to={'/'}> HOME </MenuItem>
        <MenuItem to={'/signup'}> 회원가입 </MenuItem>
        <MenuItem to={'/admin'}> 관리자 페이지 </MenuItem>
      </MenuList>
    </HeaderBlock>
  )
};

const HeaderBlock = styled.header`
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  margin-bottom: 50px;
  border: 1px solid black;
`;

const MenuList = styled.ul`
  width:80%;
  display: flex;
  justify-content:space-evenly;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: black;
`;


export default Header;