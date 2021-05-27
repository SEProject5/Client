import React, { useEffect, useState, useRef } from 'react';
import client from '../../../lib/api/client';
import AdminPresenter from './AdminPresenter';
import { EDIT_SEE_PRODUCT } from '../../../dummyData/AdminData';
import { id } from 'date-fns/locale';

export default () => {
  // Admin창의 tab메뉴
  const [tab, setTab] = useState('enrollment');
  const clickTab = tabString => {
    setTab(tabString);
  };

  // state
  // 상품 등록을 위한 state
  const [name, setName] = useState(''); // 상품 이름
  const [price, setPrice] = useState(0); // 상품 가격
  const [category, setCategory] = useState(''); // 대분류 선택값
  const [stock, setStock] = useState(0); // 상품 제고
  const [file, setFile] = useState('');

  // 상품 수정을 위한 state

  const [editData, setEditData] = useState();
  const [editData2, setEditData2] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // ref
  const previewImg = useRef();
  const previewEditImg = useRef();

  const [searchTitle, setSearchTitle] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(1000000);

  const onSearch = () => {
    if (!lowPrice) {
      setLowPrice(0);
    }
    if (!highPrice) {
      setHighPrice(1000000);
    }
    let url = ``;
    if (!searchPrice && searchTitle) {
      url = `/product/sort?keyword=${searchTitle}`;
    } else if (searchPrice && !searchTitle) {
      url = `/product/sort?orderPrice=${searchPrice}`;
    } else if (searchPrice && searchTitle) {
      url = `/product/sort?orderPrice=${searchPrice}&keyword=${searchTitle}`;
    } else {
      url = `/product/sort`;
    }
    const fetchProducts = async () => {
      try {
        const response = await client.get(url, {
          lowPrice: lowPrice,
          highPrice: highPrice,
        });
        setEditData(response.data);
      } catch (e) {
        console.log('fetch 실패');
      }
    };
    fetchProducts();
  };

  const handleSearchTitle = e => {
    setSearchTitle(e.target.value);
  };

  const handleSearchPrice = e => {
    setSearchPrice(e.target.value);
  };

  const handleLowPrice = e => {
    setLowPrice(e.target.value);
  };
  const handleHighPrice = e => {
    setHighPrice(e.target.value);
  };

  useEffect(() => {
    if (tab === 'enrollment') {
      // document.getElementById('fileInput').addEventListener('change', preview);
    } else if (tab === 'edit') {
      seeProductFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  ////////////////////////////////////// 상품 등록 ////////////////////////////////////////////////////////////////
  const checkPrice = /^[0-9]$/g;

  const uploadFunction = async () => {
    const { data } = {
      p_name: name,
      price: price,
      categoryName: category,
      file: file,
      stock: stock,
      productDetailFiles: file,
    };

    if (data) {
      // state 초기화
      setName('');
      setPrice(0);
      setCategory('');
      setFile('');
      setStock(0);

      alert('업로드가 완료되었습니다');

      // Form 입력값 초기화

      document.getElementById('Name').value = '';
      document.getElementById('Price').value = '';
      // previewImg.current.src =
      //   'https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif';
      document.getElementById('mainCategorySelect').value = '0';
      document.getElementById('Stock').value = '';
    }
  };

  // 소분류 option값 변경
  // 대분류 선택값에 따라 소분류 option값을 제한하기 위해서
  const selectChange = e => {
    setCategory(e.target.value);
  };

  const customFileBtn = () => {
    document.getElementById('fileInput').click();
  };

  // // 이미지 미리보기 기능
  // const preview = e => {
  //   const getFile = e.target.files;
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     previewImg.current.src = reader.result;
  //   };

  //   if (getFile) {
  //     reader.readAsDataURL(getFile[0]);
  //     setFile(getFile[0]);
  //   }
  // };

  // 파일에 대한 처리가 가장 늦으므로 fileUrl에 값이 들어오면 uploadFunction을 실행시킴
  // file이 아니라 다른값을 하게 되면 fileUrl 에 값이 들어오기도 전에 upload가 실행되서 파일에 대한 값이 들어가지 못함
  useEffect(() => {
    if (
      editData2 === undefined &&
      name !== '' &&
      price !== '' &&
      file !== '' &&
      stock !== 0
    ) {
      uploadFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  ////////////////////////////////////// 상품 수정 ////////////////////////////////////////////////////////////////

  // 상품을 수정하기 위한 전체상품을 보여주는 mutation

  const seeProductFunction = async () => {
    // 등록된 전체 상품 fetch
    try {
      const response = await client.get(`/product`);
      if (response.data) {
        setEditData(response.data);
      } else {
        setEditData(EDIT_SEE_PRODUCT);
      }
    } catch (e) {
      console.log('fetch 실패');
    }
  };

  const customEditFileBtn = () => {
    document.getElementById('editFileInput').click();
  };

  // const editPreview = e => {
  //   const getFile = e.target.files;
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     previewEditImg.current.src = reader.result;
  //   };

  //   if (getFile) {
  //     reader.readAsDataURL(getFile[0]);
  //     setFile(getFile[0]);
  //   }
  // };

  // edit 버튼 클릭 이벤트
  const editClick = async id => {
    // 수정 폼을 modal창 처럼 띄워주기 위함
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');

    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }

    close.onclick = () => {
      modal.style.display = 'none';
      setEditData2();
    };

    // modal창이 아닌 바깥부분 클릭시에도 창이 닫히게끔
    if (modal.style.display === 'block') {
      window.onclick = event => {
        if (event.target === modal) {
          modal.style.display = 'none';
          setEditData2(); // editData2의 값을 초기화
        }
      };
    }

    // 수정버튼을 클릭한 상품의 정보를 보여주기 위한 Mutation
    const editProduct = editData.filter(obj => obj.p_id === id)[0];
    const dummyProduct = EDIT_SEE_PRODUCT.filter(obj => obj.p_id === id)[0];

    if (editProduct) {
      setEditData2(editProduct);
      setFile(editProduct.file);
      setName(editProduct.p_name);
      setPrice(editProduct.price);
      setStock(editProduct.stock);
    } else {
      setEditData2(dummyProduct);
      setFile(dummyProduct.file);
      setName(dummyProduct.p_name);
      setPrice(dummyProduct.price);
      setStock(dummyProduct.stock);
    }
  };

  const editFunction = async () => {
    // 클릭한 id의 상품이 fetch get 되도록 설정해야함
    const data = EDIT_SEE_PRODUCT;
    if (data) {
      setName('');
      setPrice(0);
      setCategory('');
      setFile('');
      setStock(0);
      setEditData2();
      setIsEdit(false);

      seeProductFunction(); // 모든 값을 초기화 시켜줬으면 다시 전체상품 보여주는 Mutation을 실행시킴으로써 변경값을 업데이트 시켜준다.
      document.getElementById('modal').style.display = 'none';
    }
  };

  useEffect(() => {
    if (isEdit) {
      editFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  ////////////////////////////////////// 상품 삭제 ////////////////////////////////////////////////////////////////

  //   const deleteProductMutation = useMutation(DELETE_PRODUCT);

  const deleteClick = async id => {
    let message = window.confirm('해당 상품을 삭제하시겠습니까?');
    if (message) {
      try {
        client
          .delete(`/product/${id}`)
          .then(response => {
            if (response.status !== 200) {
              alert('상품 삭제 실패');
              return;
            }
            alert('상품이 삭제되었습니다');
          })
          .catch(error => {
            alert('삭제 실패');
          });
      } catch (e) {
        console.error(e);
      }
      seeProductFunction();
    }
  };
  // 로그아웃
  //   const logOut = useMutation(LOG_OUT);

  return (
    <AdminPresenter
      customFileBtn={customFileBtn}
      searchTitle={searchTitle}
      handleSearchTitle={handleSearchTitle}
      lowPrice={lowPrice}
      handleLowPrice={handleLowPrice}
      handleHighPrice={handleHighPrice}
      handleSearchPrice={handleSearchPrice}
      searchPrice={searchPrice}
      highPrice={highPrice}
      selectChange={selectChange}
      onSearch={onSearch}
      setIsEdit={setIsEdit}
      // previewImg={previewImg}
      tab={tab}
      clickTab={clickTab}
      editData={editData}
      editClick={editClick}
      deleteClick={deleteClick}
      editData2={editData2}
      // previewEditImg={previewEditImg}
      customEditFileBtn={customEditFileBtn}
      // editPreview={editPreview}
    />
  );
};
