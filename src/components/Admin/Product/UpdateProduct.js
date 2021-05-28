import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import client from '../../../lib/api/client';
import PropTypes from 'prop-types';
import { Image, Plus } from '../../Common/Icons';
import Input from '../../Common/Input';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';

const UpdateProduct = ({
  // previewImg,
  selectChange,
  customFileBtn,
  customEditFileBtn,
  editData2,
  setIsEdit,
  // editPreview,
}) => {
  const [productId, setProductId] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(
    'https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif'
  );

  const preview = e => {
    const getFile = e.target.files;
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewUrl(reader.result);
    };

    if (getFile) {
      reader.readAsDataURL(getFile[0]);
      setFile(getFile[0]);
    }
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

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (editData2) {
      setProductId(editData2.p_id);
      setName(editData2.p_name);
      setPrice(editData2.price);
      setCategoryName(editData2.categoryName);
      setFile(editData2.file);
      setStock(editData2.stock);
      setDescription(editData2.description);
    }
  }, [editData2]);

  const checkPrice = /^[0-9]$/g;

  const onRegist = e => {
    e.preventDefault();

    // 값 검사
    if (name === '' || name === '' || name === undefined) {
      alert('상품명을 입력해주세요');
      return false;
    } else if (price === '' || price === '' || price === undefined) {
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
      setFile(file);
      setDescription(String(description));
      setCategoryName(String(categoryName));
    }
    const formData = new FormData();
    console.log(file);
    console.log(previewUrl);
    formData.append('p_name', name);
    formData.append('categoryName', categoryName);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('img', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    try {
      client
        .post(`/product`, formData, config)
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

  const onUpdate = e => {
    e.preventDefault();

    // 값 검사
    if (name === '' || name === '' || name === undefined) {
      alert('상품명을 입력해주세요');
      return false;
    } else if (price === '' || price === '' || price === undefined) {
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
      setProductId(productId);
      setName(name);
      setPrice(Number(price));
      setStock(Number(stock));
      setFile(file);
      setDescription(String(description));
      setCategoryName(String(categoryName));
    }
    const formData = new FormData();
    formData.append('p_id', productId);
    formData.append('p_name', name);
    formData.append('categoryName', categoryName);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('img', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      client
        .patch(`/product/${productId}`, formData, config)
        .then(response => {
          if (response.status !== 200) {
            alert('상품 수정 실패');
            return;
          }
          alert('상품이 수정되었습니다');
          setIsEdit(true);
        })
        .catch(error => {
          setIsEdit(true);
          alert('수정 실패');
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {editData2 === undefined ? (
        <Form onSubmit={onRegist}>
          <ProductBasicDiv>
            <ImageDiv>
              <Preview>
                <PreviewImage id={'previewImg'} src={previewUrl} />
              </Preview>
              <input
                type='file'
                name='img'
                id={'fileInput'}
                accept={'image/*'}
                hidden={true}
                onChange={preview}
              />
              <ImageButton onClick={() => customFileBtn()}>
                <span>
                  <Image />
                </span>
                <span>대표 이미지</span>
              </ImageButton>
            </ImageDiv>

            <BasicDiv>
              <Label htmlFor='Name'>상품명</Label>
              <Input
                placeholder={'상품명'}
                id={'Name'}
                type={'text'}
                value={name}
                onChange={handleName}
              />
              <Label htmlFor='Price'>가격</Label>
              <Input
                placeholder={'가격'}
                id={'Price'}
                type={'number'}
                value={price}
                onChange={handlePrice}
              />
              <Label htmlFor='Stock'>재고</Label>
              <Input
                placeholder={'재고'}
                type={'number'}
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
          <TextField
            id='filled-full-width'
            label='상세 정보 입력'
            style={{ margin: 8 }}
            placeholder='내용을 입력하세요'
            fullWidth
            margin='normal'
            value={description.toString()}
            onChange={handleDescription}
            InputLabelProps={{
              shrink: true,
            }}
            variant='filled'
          />
          {/* <ImageUploader
            withIcon={true}
            buttonText='상세 정보 이미지 등록'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
          /> */}
          <EnrollmentButton type='submit'> 등록 </EnrollmentButton>
        </Form>
      ) : (
        <Form onSubmit={e => onUpdate(e)}>
          <ProductBasicDiv>
            <ImageDiv>
              <Preview>
                <PreviewImage
                  id={'previewEditImg'}
                  // ref={previewImg}
                  src={previewUrl}
                />
              </Preview>
              <input
                type='file'
                name='img'
                id='editFileInput'
                accept='image/*'
                hidden={true}
                onChange={preview}
              />
              <ImageButton onClick={() => customEditFileBtn()}>
                <span>
                  <Image />
                </span>
                <span>대표 이미지</span>
              </ImageButton>
            </ImageDiv>
            <BasicDiv>
              <Label htmlFor='Name'>상품명</Label>
              <Input
                placeholder={'상품명'}
                id={'Name'}
                value={name}
                onChange={handleName}
              />
              <Label htmlFor='Price'>가격</Label>
              <Input
                placeholder={'가격'}
                id={'Price'}
                value={price}
                onChange={handlePrice}
              />
              <Label htmlFor='Stock'>재고</Label>
              <Input
                placeholder={'재고'}
                id={'Stock'}
                value={stock}
                onChange={handleStock}
              />
              <Label htmlFor='mainCategorySelect'>카테고리</Label>
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
          {editData2.description && (
            <>
              <h3>상세 정보 입니다.</h3>
              <p>{editData2.description}</p>
            </>
          )}
          <EnrollmentButton type='submit'> 등록 </EnrollmentButton>
        </Form>
      )}
    </>
  );
};

export default UpdateProduct;

const Form = styled.form``;

const Label = styled.label`
  margin-left: 20px;
`;

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
