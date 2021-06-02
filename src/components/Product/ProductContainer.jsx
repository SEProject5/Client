import React, { useEffect, useState } from "react";
import client from '../../lib/api/client';
import useFetch from '../../lib/api/useFetch';
import {useSelector} from 'react-redux';
import ProductPresenter from "./ProductPresenter";
import { SEEITEM } from "../../dummyData/ProductData";
import {withRouter} from 'react-router-dom'

// react-router에서 match를 통해 url에 관한 정보(params, url ...)가 object로 넘어옴 
function ProductContainer({ match, history }){
    const [data, setData] = useState(SEEITEM);
    const productId = match.params.p_id;
    // const {loading, data, error} = useFetch(`/product/${productId}`);
    const [selected, setSelected] = useState([]);
    const [count, setCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [stock, setStock] = useState("");
    const [stockId, setStockId] = useState("");
    const [total, setTotal] = useState(0);
    // size와 재고량, color를 같이 묶어주기 위한 배열객체 
    let option = [];

    if (data) {
        const item = data;
        // console.log(item);
        option.push(
            {
                stock: item.stock,
            }
        )
    }

    let { user } = useSelector(({ user }) => ({ user: user.user }));


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await client.get(`/product/${productId}`);
            if(!(response.data)) return;
            setData(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        fetchUsers();
    },[]);

    // sizeValue 값이 렌더링 (바뀔때마다) 될때마다 실행됨 
    useEffect(() => {
        if (!data) return;
        // 재고량 검사 
        const isAdded = true;
        if (stock === "0") {
            alert("품절된 상품입니다.");
            return;
        }
        if (isAdded) {
            setSelected([ {
                    stock,
                    stockId
                }
            ]);
            setCount(1);
            setTotalPrice(data.price);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // selected에 totalarr이 추가되었을 때 
    //      => 사용자가 새로운 옵션값의 상품을 추가했을 때 
    // 1개에 대한 total값을 적용시키기 위해서 
    // useEffect(() => {
    //     if (totalPrice > 0) {
    //         const asd = (a, b) => a + b;
    //         // reduce는 배열의 처음부터 끝까지 순환함 
    //         setTotal(totalPrice.reduce(asd));
    //     }
    // }, [totalPrice])


    // count 값을 증가시켜줄 함수 
    const increment = (index, item) => {
        if (count < item.stock) {
            setCount(count+1);
            setTotalPrice(totalPrice+item.price);
        };
    }

    // count 값을 감소시켜줄 함수 
    const decrement = (index, item) => {
        if (count > 0) {
            setCount(count-1);
            setTotalPrice(totalPrice-item.price);
        };
    }


    // 옵션 삭제 
    const deleteSelect = (index, selected) => {
        // 삭제 버튼의 인덱스를 제외한 배열을 새롭게 만든후 다시 set해준다. 
        // => 삭제 버튼 인덱스번째의 옵션을 제외한 체로 들어가게 됨 
        const aaa = selected.filter(item => item !== selected[index]);
        setSelected([...aaa]);

        if (selected.length === 1) {
            // 선택한 옵션이 한개 뿐일때  
            // 모든 옵션관련 state값을 초기값으로 초기화 해준다 (count, totalPrice, total)
            setCount(0);
            setTotalPrice(0);
            setTotal(0);
        } else {

            let deleteCount = 0;
            setCount(deleteCount);

            setTotalPrice(0);
        }
    }

    let productArray = [];
    let stockIdArray = [];
    let countArray = [];


    const [success, setSuccess] = useState(false);

    const addCart = async (selected, product, count) => {
        const data = {userSeq: user.id, productSeq: product.p_id, productNum: count}
        console.log(data);
        client.post('/cart', data).then(response => {
            console.log('장바구니 등록 성공');
        }).catch(e => console.log(e));

        if(selected.length !== 0) {
            selected.map((item,index) => {
                return (
                    productArray.push(product.id),
                    stockIdArray.push(item.stockId), 
                    countArray.push(count)
                )
            }); 
            setSuccess(true);
        }
    }


    const confirmClose = () => {
        setSuccess(false);
    }

    const addPayment = async (selected, product, count) => {
        const data = {productSeq: product.p_id, productName: product.name, productPrice: product.price, productNum:count}

        // setTimeout(() => history.push('/payment'), 500); 
    }

    return (
        <ProductPresenter
            data={data}
            loading={false}
            selected={selected}
            count={count}
            setCount={setCount}
            increment={increment}
            decrement={decrement}
            total={totalPrice}
            deleteSelect={deleteSelect}
            addCart={addCart}
            success={success}
            confirmClose={confirmClose}
            addPayment={addPayment}
        />
    );
};

export default withRouter(ProductContainer);