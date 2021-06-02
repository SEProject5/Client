import React, { useState, useEffect } from 'react';
import axios from 'axios';
import kakao from '../../lib/api/kakao';
import PaymentPresenter from './PaymentPresenter';
import client from '../../lib/api/client';
import useInput from '../../lib/hooks/useInput';
import { toast } from 'react-toastify';
import useFetch from '../../lib/api/useFetch';
import { useSelector } from 'react-redux';
import DeliveryData from '../../dummyData/DeliveryData.json';
import CartData from '../../dummyData/CartData.json';
import { withRouter } from 'react-router-dom';
import { checkNumber } from '../../util/function/check';

function MyPageContainer ({ match, history, location }) {
  // tab
  let { user } = useSelector(({ user }) => ({ user: user.user }));

  const [tab, setTab] = useState('cart');
  const [data, setData] = useState(null);
  const [productNumArr, setProductNumArr] = useState([]);
  const [totalArr, setTotalArr] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState('');
  const [tid, setTid] = useState('');
  const [params, setParams] = useState({
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: '초코파이',
    quantity: 1,
    total_amount: total,
    tax_free_amount: 0,
    approval_url: 'http://localhost:3000',
    fail_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  });

  useEffect(() => {
    kakao
      .post('/v1/payment/ready', null, {
        params: params,
        headers: {
          Authorization: 'KakaoAK 98d06414f9c12b756486216c2c70c546',
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then(response => {
        const {
          data: { next_redirect_pc_url, tid },
        } = response;
        console.log(next_redirect_pc_url);
        console.log(tid);
        // 응답 data로 state 갱신
        setUrl(next_redirect_pc_url);
        setTid(tid);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      history.push('/');
      return;
    }
    if (location.state) {
      setData(location.state.data);
      setTotal(location.state.total);
      setTotalArr(location.state.totalArr);
      setProductNumArr(location.state.productNumArr);
      return;
    }
  }, [location]);

  const selectOrder = async () => {
    if (!data) return;
    // console.log(data);
    // console.log(total);
    // console.log(totalArr);
    // console.log(productNumArr);

    window.confirm('주문하시겠습니까?');
    // order();
  };

  return (
    <>
      <PaymentPresenter
        tab={tab}
        loading={loading}
        cartData={data}
        total={total}
        totalArr={totalArr}
        count={productNumArr}
        productNum={productNumArr}
        selectOrder={selectOrder}
      />
      <a href={url}>{url}</a>
    </>
  );
}

export default withRouter(MyPageContainer);
