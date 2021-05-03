import React from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import {addComma} from '../../util/function/SharedFunction';
import 'react-input-range/lib/css/index.css';

const MaxPrice = 100000;
const MinPrice = 0;

const RangeBar = ({ price, setPrice }) => {

  const ChangeUnit = (num) => {
    return addComma(num);
  }

  const setLimitPrice = (num) => {
    if (num.max > MaxPrice){
      setPrice({min:num.min, max:MaxPrice});
      return
    }
    if (num.min < MinPrice){
      setPrice({min:MinPrice,max:num.max});
      return
    }
    const number = {min:Math.round(num.min/1000)*1000,max:Math.round(num.max/1000)*1000};
    setPrice(number)
  }

  return (
    <Form className="form">
      <InputRange
        formatLabel={value => `${ChangeUnit(value)}원`}
        maxValue={MaxPrice}
        minValue={MinPrice}
        onChange={value => setLimitPrice(value)}
        value={price} />
    </Form>
  );
};

const Form = styled.form`
  width:400px;
  display:inline-block;
  @media (max-width:600px){
    width: 40%;
  }
`;

export default RangeBar;
