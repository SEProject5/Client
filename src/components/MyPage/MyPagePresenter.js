import React from 'react';
import styled from 'styled-components';
import { TitleDiv, H2 } from '../Product/ProductPresenter';
import Button from '../../components/Common/Button';
import SignUpForm from '../../components/Common/SignUpForm';
import Loader from '../../components/Common/Loader';
import { Pagination } from 'semantic-ui-react';
import ProductTable from './ProductTable';
import { addComma } from '../../util/function/SharedFunction';

export default ({
  tab,
  clickTab,
  // 장바구니
  loading,
  cartData,
  passCartId,
  allCheck,
  total,
  cartCountUp,
  cartCountDown,
  count,
  onDelete,
  selectOrder,
  productNum,
  // 구매목록
  buyData,
  changePage,
  buyListLoading,
  pageNum,
  // 개인정보 수정
  onSubmit,
  name,
  email,
  zipCode,
  address,
  addressDetail,
  phone1,
  phone2,
  phone3,
  open,
  setOpen,
  handleAddress,
  // 로그아웃
  //   logOut,
}) => {
  return (
    <MyPage>
      <MyPageWrapper>
        <MyPageHeader>
          <MyTitleDiv>
            <H2>My Page</H2>
            {/* <Button text={'LogOut'} onClick={() => logOut()} /> */}
          </MyTitleDiv>
          <MyNavDiv>
            <button
              onClick={() => clickTab('cart')}
              style={
                tab === 'cart'
                  ? {
                      borderColor: '#ccc',
                      borderBottom: '1px solid #fff',
                      marginBottom: '-1px',
                    }
                  : { borderColor: 'transparent' }
              }
            >
              Cart
            </button>
            <button
              onClick={() => clickTab('editProfile')}
              style={
                tab === 'editProfile'
                  ? {
                      borderColor: '#ccc',
                      borderBottom: '1px solid #fff',
                      marginBottom: '-1px',
                    }
                  : { borderColor: 'transparent' }
              }
            >
              editProfile
            </button>
          </MyNavDiv>
        </MyPageHeader>
        {tab === 'cart' ? (
          <>
            <Article>
              {loading === true && <Loader />}
              {loading === false && (
                <ProductTable
                  allCheck={allCheck}
                  cartData={cartData}
                  count={count}
                  cartCountUp={cartCountUp}
                  cartCountDown={cartCountDown}
                  productNum={productNum}
                  passCartId={passCartId}
                  total={total}
                  selectOrder={selectOrder}
                  onDelete={onDelete}
                />
              )}
            </Article>
          </>
        ) : (
          <Article>
            <Form>
              <SignUpForm
                onSubmit={onSubmit}
                name={name}
                email={email}
                ButtonText={'Edit Profile'}
                zipCode={zipCode}
                address={address}
                addressDetail={addressDetail}
                phone1={phone1}
                phone2={phone2}
                phone3={phone3}
                open={open}
                setOpen={setOpen}
                handleAddress={handleAddress}
              />
            </Form>
          </Article>
        )}
      </MyPageWrapper>
    </MyPage>
  );
};

const Box = styled.article`
  width: 100%;
  border-radius: 0;
  max-width: 500px;
  margin: 0 auto;
`;

const Form = styled(Box)`
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 0;
    border-top: ${props => props.theme.boxBorder};
    border-bottom: ${props => props.theme.boxBorder};
    margin-bottom: 30px;
    @media (max-width: 600px) {
      ${props => props.theme.whiteBox};
    }
    input {
      width: 80%;
      margin: 5px 0;
      &:first-child {
        margin-top: 15px;
      }
      @media (max-width: 600px) {
        width: 90%;
      }
    }
    button {
      width: 80%;
      margin: 5px 0;
      &:last-child {
        margin-bottom: 15px;
      }
      @media (max-width: 600px) {
        width: 90%;
      }
    }
    #loginBtn,
    #createAccountBtn {
      background-color: ${props => props.theme.confirmColor};
      color: black;
      margin-bottom: 30px;
    }
  }
`;

export const MyPage = styled.section`
  min-height: 79vh;
  overflow: hidden;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

const MyPageWrapper = styled.div`
  #cartOrderBtn {
    width: auto;
    padding: 10px 35px;
    float: right;
    margin: 20px 0;
    @media (max-width: 600px) {
      width: 100%;
      margin: 20px 0 60px 0;
    }
  }
  #responsiveTotalDiv {
    @media (min-width: 600px) {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    padding: 0 50px;
  }
  @media (max-width: 600px) {
    padding: 0 20px;
  }
  @media (max-width: 350px) {
    padding: 0 10px;
  }
`;

const MyPageHeader = styled.header``;

export const MyTitleDiv = styled(TitleDiv)`
  display: flex;
  justify-content: space-between;
  button {
    width: auto;
  }
`;

export const MyNavDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 30px 0 0;
  border-bottom: 1px solid #ccc;
  button {
    border: 1px solid transparent;
    border-bottom: 0;
    cursor: pointer;
    font-weight: 600;
    background-color: transparent;
    font-size: 18px;
    outline: none;
    padding: 15px;
    @media (max-width: 600px) {
      padding: 10px;
    }
    :hover {
      color: ${props => props.theme.confirmColor};
    }
  }
`;

export const Article = styled.article`
  margin-top: 60px;
  form {
    margin: 0 auto;
  }
`;

const BuyListTable = styled.table`
  width: 100%;
  tbody {
    text-align: center;
    tr {
      border-bottom: 1px solid #ccc;
      td {
        padding: 10px;
      }
    }
  }
`;

const Thead = styled.thead`
  background-color: ${props => props.theme.confirmColor};
  color: white;
`;

const Th = styled.th`
  padding: 10px;
  vertical-align: middle;
`;

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  div {
    min-height: 0 !important;
    box-shadow: none !important;
    a {
      padding: 5px 7px !important;
      min-width: 0 !important;
    }
  }
`;
