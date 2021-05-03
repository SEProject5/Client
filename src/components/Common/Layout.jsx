import * as React from 'react';
import styled from 'styled-components';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import CategoryMenu from '../Common/CategoryMenu';

const Layout = ({ children }) => (
  <>
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </>
);

const Main = styled.main`
  width:1000px;
  @media (max-width:1000px) {
    width:100%;
  }
  margin: 0 auto;
  min-height:70vh;
`;

export default Layout;
