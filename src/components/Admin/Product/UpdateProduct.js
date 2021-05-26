import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import client from '../../../lib/api/client';
import PropTypes from 'prop-types';
import { Image, Plus } from '../../Common/Icons';
import Input from '../../Common/Input';
import ImageUploader from 'react-images-upload';

const UpdateProduct = ({
  previewImg,
  selectChange,
  customFileBtn,
  customEditFileBtn,
  editData2,
  setIsEdit,
  editPreview,
}) => {
  const [productId, setProductId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState([]);

  const onDrop = picture => {
    setDescription([...description, picture]);
  };
  const handleCategory = e => {
    setCategoryName(e.target.value);
    selectChange(e);
  };
  const handleName = e => {
    setName(e.target.value);
  };
  const handlePrice = e => {
    setPrice(e.target.value);
  };
  const handleStock = e => {
    setStock(e.target.value);
  };

  useEffect(() => {
    if (editData2) {
      setProductId(editData2.p_id);
      setName(editData2.p_name);
      setPrice(editData2.price);
      setCategoryName(editData2.categoryName);
      setFile(editData2.files[0].url);
      setStock(editData2.stock);
      setDescription(editData2.description);
    }
  }, [editData2]);

  const checkPrice = /^[0-9]$/g;

  // const onUpdate = async e => {
  //   e.preventDefault();

  //   // 값 검사
  //   if (name === '' || name === null || name === undefined) {
  //     alert('상품명을 입력해주세요');
  //     return false;
  //   } else if (price === '' || price === null || price === undefined) {
  //     alert('상품 가격을 입력해주세요');
  //     return false;
  //   } else if (checkPrice.test(price)) {
  //     alert('가격은 숫자만 입력할 수 있습니다.');
  //     return false;
  //   } else if (categoryName === '' || categoryName === 0) {
  //     alert('대분류를 선택해주세요');
  //     return false;
  //   } else if (file === '') {
  //     alert('상품 이미지를 선택해주세요');
  //     return false;
  //   } else if (stock === '') {
  //     alert('재고를 입력해주세요');
  //     return false;
  //   } else {
  //     setName(name);
  //     setPrice(Number(price));
  //     setStock(Number(stock));
  //   }
  //   const result = {
  //     p_id: productId,
  //     p_name: name,
  //     file: file,
  //     description: description,
  //     categoryName: categoryName,
  //     price: price,
  //     stock: stock,
  //   };
  //   try {
  //     client
  //       .post(`/products/:${productId}`, result)
  //       .then(response => {
  //         if (response.status !== 200) {
  //           alert('상품 등록 실패');
  //           return;
  //         }
  //         alert('상품이 등록되었습니다');
  //         setIsEdit(true);
  //       })
  //       .catch(error => {
  //         setIsEdit(true);
  //         alert('등록 실패');
  //       });
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   console.log(result);
  // };

  const onUpdate = e => {
    e.preventDefault();

    // 값 검사
    if (name === '' || name === null || name === undefined) {
      alert('상품명을 입력해주세요');
      return false;
    } else if (price === '' || price === null || price === undefined) {
      alert('상품 가격을 입력해주세요');
      return false;
    } else if (checkPrice.test(price)) {
      alert('가격은 숫자만 입력할 수 있습니다.');
      return false;
    } else if (categoryName === '' || categoryName === 0) {
      alert('대분류를 선택해주세요');
      return false;
    } else if (file === '') {
      alert('상품 이미지를 선택해주세요');
      return false;
    } else if (stock === '') {
      alert('재고를 입력해주세요');
      return false;
    } else {
      setName(name);
      setPrice(Number(price));
      setStock(Number(stock));
    }
    const formData = new FormData();
    formData.append('p_id', productId);
    formData.append('p_name', name);
    formData.append('categoryName', categoryName);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      client
        .post(`/products/:${productId}`, formData, config)
        .then(response => {
          if (response.status !== 200) {
            alert('상품 등록 실패');
            return;
          }
          alert('상품이 등록되었습니다');
          setIsEdit(true);
        })
        .catch(error => {
          setIsEdit(true);
          alert('등록 실패');
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {editData2 === undefined ? (
        <Form onSubmit={onUpdate}>
          <ProductBasicDiv>
            <ImageDiv>
              <Preview>
                <PreviewImage
                  id={'previewImg'}
                  ref={previewImg}
                  src={
                    'https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif'
                  }
                />
              </Preview>
              <input
                type='file'
                id={'fileInput'}
                accept={'image/*'}
                hidden={true}
              />
              <ImageButton onClick={() => customFileBtn()}>
                <span>
                  <Image />
                </span>
                <span>대표 이미지</span>
              </ImageButton>
            </ImageDiv>
            <BasicDiv>
              <Input
                placeholder={'상품명'}
                id={'Name'}
                value={name}
                onChange={handleName}
              />
              <Input
                placeholder={'가격'}
                id={'Price'}
                value={price}
                onChange={handlePrice}
              />
              <Input
                placeholder={'재고'}
                id={'Stock'}
                value={stock}
                onChange={handleStock}
              />
              <SortDiv>
                <Select
                  onChange={e => handleCategory(e)}
                  id={'mainCategorySelect'}
                >
                  <option value='0'>대분류</option>
                  <option value='Top'>Top</option>
                  <option value='Bottom'>Bottom</option>
                </Select>
              </SortDiv>
            </BasicDiv>
          </ProductBasicDiv>
          <ImageUploader
            withIcon={true}
            buttonText='상세 정보 이미지 등록'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
          />

          <EnrollmentButton type='submit'> 등록 </EnrollmentButton>
        </Form>
      ) : (
        <Form onSubmit={e => onUpdate(e)}>
          <ProductBasicDiv>
            <ImageDiv>
              <Preview>
                <PreviewImage
                  id={'previewEditImg'}
                  ref={previewImg}
                  src={editData2.files[0].url}
                />
              </Preview>
              <input
                type='file'
                id='editFileInput'
                accept='image/*'
                hidden={true}
                onChange={editPreview}
              />
              <ImageButton onClick={() => customEditFileBtn()}>
                <span>
                  <Image />
                </span>
                <span>대표 이미지</span>
              </ImageButton>
            </ImageDiv>
            <BasicDiv>
              <Input
                placeholder={'상품명'}
                id={'Name'}
                value={name}
                onChange={handleName}
              />
              <Input
                placeholder={'가격'}
                id={'Price'}
                value={price}
                onChange={handlePrice}
              />
              <Input
                placeholder={'재고'}
                id={'Stock'}
                value={stock}
                onChange={handleStock}
              />
              <SortDiv>
                <Select
                  onChange={e => handleCategory(e)}
                  id={'mainCategorySelect'}
                >
                  <option value='0'>대분류</option>
                  <option value='Top'>Top</option>
                  <option value='Bottom'>Bottom</option>
                </Select>
              </SortDiv>
            </BasicDiv>
          </ProductBasicDiv>
          <ImageUploader
            withIcon={true}
            buttonText='상세 정보 이미지 등록'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
          />
          {editData2.description &&
            editData2.description.map(obj => (
              <>
                <PreviewImage key={obj.id} src={obj.url} />
              </>
            ))}
          <EnrollmentButton type='submit'> 등록 </EnrollmentButton>
        </Form>
      )}
    </>
  );
};

export default UpdateProduct;

const Form = styled.form``;

const ProductBasicDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Select = styled.select`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  padding: 10px;
  text-align: center;
  margin: 5px 0;
`;

const ImageDiv = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const Preview = styled.div`
  width: 150px;
  height: 200px;
  background-color: white;
  ${props => props.theme.whiteBox};
  border-radius: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageButton = styled.div`
  width: 150px;
  background-color: #eeeeee;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const BasicDiv = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 80%;
  }
  input {
    margin-bottom: 15px;
    @media (max-width: 720px) {
      margin-left: 20px;
    }
  }
  select {
    @media (max-width: 720px) {
      margin-left: 20px;
    }
  }
`;

const SortDiv = styled.div`
  display: flex;
  justify-content: space-between;
  select {
    padding: 7px;
    width: 45%;
  }
`;

const EnrollmentButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 8px 0;
  background-color: black;
  color: white;
  cursor: pointer;
  margin: 50px 0 20px;
`;
