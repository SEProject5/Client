import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from './StyledButton';
import LoginContainer from '../Login/LoginContainer';

const Header = () => {
  const { user } = useSelector(({ user }) => ({
    user:user.user,
  }));
   return (
    <HeaderBlock>
      <Button cyan to='/'>
        <h1>THISISCLOTH</h1>
      </Button>
      <LoginContainer/>
      <MenuList>
        <MenuItem to={'/'}> HOME </MenuItem>
        <MenuItem to={'/signup'}> 회원가입 </MenuItem>
        {user && user.user_type === 'admin' ?
          (<MenuItem to={'/admin'}> 관리자 페이지 </MenuItem>)
          : (<MenuItem to={'/myPage'}> 마이 페이지 </MenuItem>)
        }
      </MenuList>
    </HeaderBlock>
  )
};

const HeaderBlock = styled.header`
margin-top: 20px;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
`;

const MenuList = styled.ul`
  width:100%;
  height: 40px;
  display: flex;
  justify-content:space-evenly;
  align-items: center;
  border: 1px solid black;

`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: black;
`;


export default Header;