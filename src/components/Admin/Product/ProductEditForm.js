import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image, Plus } from '../../Common/Icons';
import Input from '../../Common/Input';

const ProductEditForm = ({
  onSubmit,
  previewImg,
  customFileBtn,
  selectChange,
  addTable,
  editData2,
  editPreview,
}) => {
  console.log(editData2);
  return (
    <>
      {editData2 === undefined ? (
        <Form onSubmit={e => onSubmit(e)}>
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
                <span>이미지 선택</span>
              </ImageButton>
            </ImageDiv>
            <BasicDiv>
              <Input placeholder={'Name'} id={'Name'} />
              <Input placeholder={'Price'} id={'Price'} />
              <SortDiv>
                <Select
                  onChange={e => selectChange(e)}
                  id={'mainCategorySelect'}
                >
                  <option value='0'>대분류</option>
                  <option value='Top'>Top</option>
                  <option value='Bottom'>Bottom</option>
                </Select>
              </SortDiv>
            </BasicDiv>
          </ProductBasicDiv>
          <OptionTitleDiv>
            <h4>옵션</h4>
          </OptionTitleDiv>
          <OptionDiv>
            <table>
              <thead>
                <tr>
                  <th>색상</th>
                  <th>사이즈</th>
                  <th>재고량</th>
                </tr>
              </thead>
              <tbody id='tbody'>
                <tr>
                  <td>
                    <input type='text' className={'color'} />
                  </td>
                  <td>
                    <input type='text' className={'size'} />
                  </td>
                  <td>
                    <input type='text' className={'stock'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </OptionDiv>
          <PlusDiv onClick={() => addTable()}>
            <Plus />
          </PlusDiv>
          <EnrollmentButton> 등록 </EnrollmentButton>
        </Form>
      ) : (
        <Form onSubmit={e => onSubmit(e)}>
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
              <ImageButton onClick={() => customFileBtn()}>
                <span>
                  <Image />
                </span>
                <span>이미지 선택</span>
              </ImageButton>
            </ImageDiv>
            <BasicDiv>
              <Input
                placeholder={'Name'}
                id={'Name'}
                defaultValue={editData2.name}
              />
              <Input
                placeholder={'Price'}
                id={'Price'}
                defaultValue={editData2.price}
              />
              <SortDiv>
                <Select onChange={e => selectChange(e)} id={'mainSelect'}>
                  <option value=''>대분류</option>
                  <option value='Outer'>Outer</option>
                  <option value='Top'>Top</option>
                  <option value='Bottom'>Bottom</option>
                </Select>
              </SortDiv>
            </BasicDiv>
          </ProductBasicDiv>
          <OptionTitleDiv>
            <h4>옵션</h4>
          </OptionTitleDiv>
          <OptionDiv>
            <table>
              <thead>
                <tr>
                  <th>색상</th>
                  <th>사이즈</th>
                  <th>재고량</th>
                </tr>
              </thead>
              <tbody id='tbody'>
                {editData2.sizes.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type='text'
                        className={'color'}
                        defaultValue={editData2.colors[index].value}
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        className={'size'}
                        defaultValue={item.value}
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        className={'stock'}
                        defaultValue={editData2.stocks[index].value}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </OptionDiv>
          <PlusDiv onClick={() => addTable()}>
            <Plus />
          </PlusDiv>
          <EnrollmentButton> 등록 </EnrollmentButton>
        </Form>
      )}
    </>
  );
};

export default ProductEditForm;

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

const OptionTitleDiv = styled.div`
  margin: 30px 0;
  h4 {
    font-size: 14px;
    font-weight: 600;
  }
`;

const OptionDiv = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 1px solid #ccc;
    tr {
      border-top: 1px solid #ccc;
    }
    th,
    td {
      border-right: 1px solid #ccc;
      text-align: center;
      &:last-child {
        border-right: 0;
      }
    }
    thead {
      tr {
        background-color: ${props => props.theme.confirmColor};
      }
      th {
        padding: 10px 0;
      }
    }
    tbody {
      td {
        margin: 5px 0;
      }
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline-style: none;
        text-align: center;
      }
    }
  }
`;

const PlusDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
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
