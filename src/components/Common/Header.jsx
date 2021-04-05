import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>Header 영역</h1>
      <Link to={'/'}> HOME </Link><br/>
      <Link to={'/signup'}> 회원가입 </Link><br/>
      <Link to={'/login'}> 로그인 </Link><br/>
    </>
  )
};

export default Header;