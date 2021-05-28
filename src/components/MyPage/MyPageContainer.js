import React, { useState, useEffect } from 'react';
import MyPagePresenter from './MyPagePresenter';
import client from '../../lib/api/client';
import useInput from '../../lib/hooks/useInput';
import { toast } from 'react-toastify';
import useFetch from '../../lib/api/useFetch';
import { useSelector } from 'react-redux';
import DeliveryData from '../../dummyData/DeliveryData.json';
import CartData from '../../dummyData/CartData.json';
import { withRouter } from 'react-router-dom';
import { checkNumber } from '../../util/function/check';

function MyPageContainer ({ match, history }) {
  // tab
  const [tab, setTab] = useState('cart');
  const clickTab = tabString => {
    setTab(tabString);
  };

  // 장바구니
  const [cartId, setCartId] = useState('');
  const [productNum, setProductNum] = useState([]);
  const [totalarr, setTotalarr] = useState([]);
  const [total, setTotal] = useState(0);
  // 총 합계를 구하기 위한 식 (array.reduce에서 사용됨)
  const totalFunc = (a, b) => a + b;

  let productArray = [];
  let countArray = [];
  let cartArray = [];

  let { user } = useSelector(({ user }) => ({ user: user.user }));
  // let { loading, data, error } = useFetch(`/cart/:${user.id}`);

  const [data, setData] = useState(CartData);
  // const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      history.push('/');
      // setData(CartData);
      return;
    }
    const url = `/cart/${user.id}`;

    const fetchUsers = async () => {
      try {
        const response = await client.get(url);
        if (!response.data.length) return;
        setData(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {}
    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     setDeliveryData(DeliveryData);
  //     return;
  //   }
  //   const url = `/deliver_address/${user.id}`;

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await client.get(url);
  //       setDeliveryData(response.data); // 데이터는 response.data 안에 들어있습니다.
  //     } catch (e) {}
  //   };
  //   fetchUsers();
  // }, [user, match]);

  const deleteFetch = url => {
    const fetchUsers = async () => {
      try {
        const response = await client.delete(url);
      } catch (e) {}
    };
    fetchUsers();
  };

  const onDelete = cartSeq => {
    deleteFetch(`/cart/:${cartSeq}`);
  };

  const updateFetch = (url, current) => {
    const result = {
      userSeq: current.userSeq,
      productSeq: current.productSeq,
      price: current.price,
      p_name: current.p_name,
      file: window.location.href + ':3001/' + current.file,
      productNum: current.productNum,
    };
  };

  const onUpdate = current => {
    updateFetch(`/cart/:${current.cartSeq}`, current);
  };

  useEffect(() => {
    const countTemp = [];
    const totalarrTemp = [];
    const totalTemp = [];
    if (loading === false && data) {
      data.map(item => countTemp.push(item.productNum));
      setProductNum([...countTemp]);
      data.map(item => totalarrTemp.push(item.price));
      setTotalarr([...totalarrTemp]);
      countTemp.map((productNum, index) =>
        totalTemp.push(productNum * totalarrTemp[index])
      );
      if (totalTemp.length === 0) {
        setTotal(0);
      } else {
        setTotal(totalTemp.reduce(totalFunc));
      }
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  const cartCountUp = i => {
    productNum.splice(i, 1, productNum[i] + 1);
    setProductNum([...productNum]);
  };

  const cartCountDown = i => {
    if (productNum[i] > 1) {
      productNum.splice(i, 1, productNum[i] - 1);
      setProductNum([...productNum]);
    }
  };

  useEffect(() => {
    if (loading === false && data) {
      const totalarrTemp = [];
      const countTemp = [];
      productNum.map(item => countTemp.push(item));

      data.map((item, index) =>
        totalarrTemp.push(countTemp[index] * item.price)
      );
      setTotalarr([...totalarrTemp]);
      if (totalarrTemp.length !== 0) {
        setTotal(totalarrTemp.reduce(totalFunc));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productNum]);

  // 장바구니에서 상품을 삭제하기 위해 생성
  // => 클릭한 상품의 Id 값을 받아와서 cartId에 set해줌
  const passCartId = async id => {
    setCartId(id);
  };

  // passcartId함수가 실행되면 cartId의 값이 setting 되고 해당 hook(useEffect)이 실행됨
  useEffect(() => {
    if (cartId !== '') {
      onDelete(cartId);
      setCartId('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  const allCheck = checked => {
    if (!data) return;
    if (checked) {
      if (loading === false) {
        data.map(item => {
          const chkBox = document.getElementById(item.productSeq);
          return (chkBox.checked = true);
        });
      }
    } else {
      if (loading === false) {
        data.map(item => {
          const chkBox = document.getElementById(item.productSeq);
          return (chkBox.checked = false);
        });
      }
    }
  };

  let isChecked = false;

  const selectOrder = async () => {
    if (!data) return;
    data.map(async (item, index) => {
      const chkBox = document.getElementById(item.productSeq);
      if (chkBox.checked === true) {
        isChecked = true;
        return (
          productArray.push(item.productSeq),
          countArray.push(item.productNum[index]),
          cartArray.push(item.productSeq)
        );
      }
    });
    if (isChecked) {
      if (data) {
        productArray = [];
        countArray = [];
        cartArray = [];
        // setTimeout(() => history.push('/payment'), 1000);
      }
    }
    if (isChecked === false) {
      alert('주문할 상품을 선택하여 주세요');
    }
  };

  // 구매 목록
  const [buyData, setBuyData] = useState('');
  // 페이징을 위한 초기 first, skip 값
  const first = 1;
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState();
  const [totalPage, setTotalpage] = useState(0);

  //   const changePage = value => {
  //     setPage(value - 1);
  //     setSkip((value - 1) * first);
  //   };

  //   // page의 값이 바뀔때마다 구매목록 페이지를 가져온다.
  //   // page 값은 changePage 함수가 실행 된 후 바뀌게 되며,
  //   // changePage 함수에서 skip의 값이 바뀌고 그 후에 seeBuyListFunc()이 실행되기 때문에
  //   // 페이징 효과를 가져올 수 있음
  //   useEffect(() => {
  //     seeBuyListFunc();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [page]);

  //   const seeBuyListFunc = async () => {
  //     const { data } = await seeBuyListMutation();
  //     setBuyData(data);
  //   };

  //   useEffect(() => {
  //     if (tab === 'buyList') {
  //       seeBuyListFunc();
  //       if (buyListLoading === false) {
  //         setTotalpage(Math.ceil(BuyListData.seeBuyList.length / first));
  //       }
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [tab]);

  // 개인정보 수정
  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const zipCode = useInput('');
  const address = useInput('');
  const addressDetail = useInput('');
  const phone1 = useInput('');
  const phone2 = useInput('');
  const phone3 = useInput('');
  const [open, setOpen] = useState(false);
  // 개인정보를 변경한후 변경정보를 얻어오기 위한 delay
  const [delay, setDelay] = useState(false);

  //   const editProfileMutation = useMutation(EDIT_PROFILE, {
  //     variables: {
  //       name: name.value,
  //       zipCode: zipCode.value,
  //       address: address.value,
  //       addressDetail: addressDetail.value,
  //       phone: phone1.value + '-' + phone2.value + '-' + phone3.value,
  //       password: password.value,
  //       confirmPassword: confirmPassword.value,
  //     },
  //   });

  // loading과 delay 값이 바뀔 때마다 실행됨
  // 개인정보 수정에서 기존의 정보를 미리 setting 해 두기 위한 코드
  // delay가 있는 이유는 정보를 성공적으로 수정한 직후에
  // Form의 input에 있는 값들을 수정된 정보로 보여주기 위함
  // const deliveryData = useFetch(`/deliver_address/${user.id}`);
  const deliveryData = DeliveryData;

  useEffect(() => {
    if (loading === false && delay && deliveryData && user) {
      const fullPhone = deliveryData[0].receiver_phone.split('-');
      name.setValue(user.name);
      email.setValue(deliveryData[0].user_id);
      zipCode.setValue(deliveryData[0].zipCode);
      address.setValue(deliveryData[0].address);
      addressDetail.setValue(deliveryData[0].address_detail);
      phone1.setValue(fullPhone[0]);
      phone2.setValue(fullPhone[1]);
      phone3.setValue(fullPhone[2]);
      setDelay(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, delay]);

  const handleAddress = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    zipCode.setValue(data.zonecode);
    address.setValue(fullAddress);
    addressDetail.setValue('');
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (
      name.value !== '' &&
      zipCode.value !== '' &&
      address.value !== '' &&
      addressDetail.value !== '' &&
      phone1.value !== '' &&
      phone2.value !== '' &&
      phone3.value !== ''
    ) {
      if (password !== '') {
        if (password.value !== confirmPassword.value) {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
      }
      if (phone2.value.length !== 4 || checkNumber.test(phone2.value)) {
        alert('전화번호는 숫자 4자리를 입력하세요');
        return false;
      }

      try {
        const result = {
          user_id: name.value,
          address_name: address.value,
          receiver_phone: `${phone1.value}-${phone2.value}-${phone3.value}`,
          zip_code: zipCode.value,
          address: address.value,
          address_detail: addressDetail.value,
          address_type: '0',
        };
        const edit = client.patch(`/deliver_address/${user.id}`, result);
        if (edit) {
          toast.success('개인정보가 성공적으로 수정되었습니다!');
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 500);
  }, [data]);

  // 로그아웃
  //   const logOut = useMutation(LOG_OUT);

  return (
    <MyPagePresenter
      tab={tab}
      clickTab={clickTab}
      loading={loading}
      cartData={data}
      passCartId={passCartId}
      allCheck={allCheck}
      total={total}
      cartCountUp={cartCountUp}
      cartCountDown={cartCountDown}
      count={countArray}
      productNum={productNum}
      selectOrder={selectOrder}
      onSubmit={onSubmit}
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      zipCode={zipCode}
      address={address}
      addressDetail={addressDetail}
      phone1={phone1.setValue}
      phone2={phone2}
      phone3={phone3}
      open={open}
      setOpen={setOpen}
      handleAddress={handleAddress}
      //   data={data}
      //   buyData={buyData}
      //   BuyListData={BuyListData}
      //   pageNum={totalPage}
      //   buyListLoading={buyListLoading}
      //   changePage={changePage}
      //   logOut={logOut}
      totalarr={totalarr}
    />
  );
}

export default withRouter(MyPageContainer);
