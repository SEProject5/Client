import React from 'react';
import styled from 'styled-components';
import { defaultImg } from '../../dummyData/img/defaultImg';

const Container = styled.img`
  /* height: 200px; */
  width: 100%;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const handleImgError = e => {
  e.target.src = defaultImg;
};

const Image = props => {
  const { src, alt } = props;
  let address = '';
  if (src && src.includes('uploads')) {
    address =
      'http://ec2-13-125-128-80.ap-northeast-2.compute.amazonaws.com:3001/' +
      src;
  } else {
    address = src;
  }
  return <Container src={address} alt={alt} onError={handleImgError} />;
};

export default Image;
