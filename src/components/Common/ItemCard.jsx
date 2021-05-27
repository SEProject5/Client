import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { addComma } from "../../util/function/SharedFunction";
import errorImg from '../../dummyData/img/top-02.jpg';

export default function ItemCard({ imgSrc, title, price, id }){

    const handleImgError = (e) => {
    	e.target.src = errorImg;
    }
    return (
        <Link to={`/product/${id}`}>
            <ItemDiv>
                <Img mode={"fit"} src={imgSrc} onError={handleImgError} />
                <TextDiv>
                    <P>{title}</P>
                    <P>￦{addComma(price)}</P>
                </TextDiv>
            </ItemDiv>
        </Link>
    )
}

const ItemDiv = styled.article`
display: flex; 
flex-direction: column;
margin: 0 10px;
justify-content: space-between;
`;

const Img = styled.img`
${props => props.theme.whiteBox};
width: 100%;
box-shadow: 0px 0px 0px rgba(0,0,0,0), 0px 0px 10px rgba(0,0,0,0.1);
`;

const TextDiv = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px; 
`;

const P = styled.p`
padding-bottom: 5px;
color: #555555;
font-size: 14px;
font-weight: 600;
`;