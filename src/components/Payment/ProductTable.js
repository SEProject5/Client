import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import {
  SelectedCount,
  SelectedCountTextDiv,
  SelectedCountBtnDiv,
} from '../Product/ProductPresenter';
import {} from '../../util/function/SharedFunction';
import Image from '../Common/Image';
const ProductTable = ({
  cartData,
  totalArr,
  count,
  total,
  selectOrder,
  productNum,
}) => {
  return (
    <>
      <Table>
        <Thead>
          <tr>
            <Th scope='col'>product</Th>
            <Th scope='col'>Name (Option) </Th>
            <Th scope='col'>price</Th>
            <Th scope='col'>Quantity</Th>
            <Th scope='col'>Total</Th>
          </tr>
        </Thead>
        <tbody>
          {cartData &&
            cartData.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/product/${item.productSeq}`}>
                    <Image src={item.Product.file} alt={item.productSeq} />
                  </Link>
                </td>
                <BoldTd>
                  <Link
                    to={`/product/${item.productSeq}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <div>{item.Product.p_name}</div>
                  </Link>
                </BoldTd>
                <BoldTd>￦{item.Product.price}</BoldTd>
                <td>
                  <SelectedCount2>
                    <SelectedCountTextDiv2 style={{ fontSize: '1.2rem' }}>
                      {productNum[index] + '개'}
                    </SelectedCountTextDiv2>
                  </SelectedCount2>
                </td>
                <BoldTd>￦{totalArr[index]}</BoldTd>
              </tr>
            ))}
        </tbody>
        {!isNaN(total) && cartData && (
          <tfoot>
            <tr>
              <BoldTd colSpan='1'>Total</BoldTd>
              <td colSpan='1' style={{ color: 'red' }}>
                ￦{total}
              </td>
            </tr>
          </tfoot>
        )}
      </Table>
      <ResponsiveTotalDiv id={'responsiveTotalDiv'}>
        <p>Total : ￦{total}</p>
      </ResponsiveTotalDiv>
    </>
  );
};

ProductTable.propTypes = {
  cartData: PropTypes.array,
  count: PropTypes.array,
  productNum: PropTypes.array,
  cartCountUp: PropTypes.func,
  cartCountDown: PropTypes.func,
  passCartId: PropTypes.func,
  total: PropTypes.number,
  selectOrder: PropTypes.func,
};

export default ProductTable;

const Table = styled.table`
  width: 100%;
  img {
    width: 130px;
    height: 150px;
  }
  td,
  th {
    padding: 10px;
    vertical-align: middle;
  }
  td {
    min-width: 178px;
    text-align: center;
    vertical-align: middle;
  }
  tbody {
    tr {
      border-bottom: 1px solid #ccc;
    }
    #emptyTd {
      padding: 50px 0;
      @media (max-width: 600px) {
        display: block;
        border-radius: 10px;
        background-color: transparent;
        border-color: #ccc;
      }
    }
  }
  tfoot {
    tr {
      border-bottom: 1px solid #ccc;
    }
    @media (max-width: 600px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    display: block;
    thead {
      display: none;
    }
    img {
      width: 100px;
    }
    tr {
      display: block;
      margin: 0.5rem 0;
      padding: 0;
      width: 100%;
      position: relative;
      border-radius: 10px;
      border: 1px solid #ccc;
      @media (max-width: 350px) {
        width: 95%;
      }
    }
    tbody {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media (max-width: 350px) {
        align-items: stretch;
      }
    }
    td:first-child {
      position: relative;
      top: 0;
      transform: translateY(0);
      width: 100%;
      background-color: ${props => props.theme.confirmColor};
      border-radius: 10px 10px 0 0;
      border-color: ${props => props.theme.confirmColor};
      border: 1px solid;
    }
    td {
      display: block;
      :nth-child(2) {
        position: absolute !important;
        left: 0;
        width: auto !important;
        height: 180px;
        border-right: 1px solid #ccc;
      }
    }
    td {
      :not(:first-child):not(:nth-child(2)) {
        position: relative;
        margin-left: 125px;
        padding: 5px 1em;
        text-align: left;
        width: auto;
      }
    }
    td:not(:first-child):before {
      content: '';
      display: block;
      left: 0;
      position: relative;
      font-size: 0.8em;
      padding-bottom: 0.3em;
      text-align: left;
      color: darkgray;
    }
    td:nth-child(2):before {
      content: 'Name (Option)';
    }
    td:nth-child(3):before {
      content: 'Price';
    }
    td:nth-child(4):before {
      content: 'Quantity';
    }
  }
`;

const Thead = styled.thead`
  color: white;
  background-color: black;
`;

const Th = styled.th`
  padding: 10px;
  vertical-align: middle;
`;

const BoldTd = styled.td`
  font-weight: 600;
  color: black;
`;

const SelectedCount2 = styled(SelectedCount)`
  @media (max-width: 600px) {
    margin-left: 0;
    justify-content: left;
  }
`;

const SelectedCountTextDiv2 = styled(SelectedCountTextDiv)`
  padding: 5px 15px;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const ResponsiveTotalDiv = styled.div`
  font-weight: 600;
`;

const PaymentTd = styled.td`
  @media (min-width: 600px) {
    display: none;
  }
`;

const ButtonDiv = styled.div`
  button {
    color: white;
    background-color: black;
  }
`;
