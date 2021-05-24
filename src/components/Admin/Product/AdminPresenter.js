import React from 'react';
import styled from 'styled-components';
import Button from './../../Common/Button';
import EditProduct from './EditProduct';
import Loader from '../../Common/Loader';
import ProductEditForm from './ProductEditForm';

export default ({
  customFileBtn,
  selectChange,
  subSelectChange,
  addTable,
  onSubmit,
  previewImg,
  tab,
  clickTab,
  editData,
  editClick,
  deleteClick,
  editData2,
  previewEditImg,
  customEditFileBtn,
  editPreview,
}) => {
  return (
    <Admin>
      <AdminWrapper>
        <NavDiv>
          <button
            onClick={() => clickTab('enrollment')}
            style={
              tab === 'enrollment'
                ? {
                    borderColor: '#ccc',
                    borderBottom: '1px solid #fff',
                    marginBottom: '-1px',
                  }
                : { borderColor: 'transparent' }
            }
          >
            상품 등록
          </button>
          <button
            onClick={() => clickTab('edit')}
            style={
              tab === 'edit'
                ? {
                    borderColor: '#ccc',
                    borderBottom: '1px solid #fff',
                    marginBottom: '-1px',
                  }
                : { borderColor: 'transparent' }
            }
          >
            상품 수정
          </button>
        </NavDiv>
        {tab === 'enrollment' && (
          <Article>
            <ProductEditForm
              onSubmit={onSubmit}
              previewImg={previewImg}
              customFileBtn={customFileBtn}
              selectChange={selectChange}
              subSelectChange={subSelectChange}
              //   smallClassification={smallClassification}
              addTable={addTable}
              editPreview={editPreview}
            />
          </Article>
        )}
        {tab === 'edit' && editData === undefined && <Loader />}
        {tab === 'edit' && editData && (
          <EditBox>
            <EditGrid>
              {editData.map(item => (
                <EditProduct
                  key={item.id}
                  img={item.files[0].url}
                  name={item.name}
                  category={item.category}
                  //   subCategory={item.subCategory}
                  price={item.price}
                  sizes={item.sizes}
                  colors={item.colors}
                  stocks={item.stocks}
                  editClick={editClick}
                  id={item.id}
                  deleteClick={deleteClick}
                />
              ))}
            </EditGrid>
          </EditBox>
        )}
        <Modal id={'modal'}>
          <ModalContent>
            <span id={'close'}>&times;</span>
            {editData2 === undefined && <Loader />}
            {editData2 !== undefined && (
              <ProductEditForm
                onSubmit={onSubmit}
                previewImg={previewEditImg}
                customFileBtn={customEditFileBtn}
                selectChange={selectChange}
                subSelectChange={subSelectChange}
                // smallClassification={smallClassification}
                addTable={addTable}
                editData2={editData2}
                editPreview={editPreview}
              />
            )}
          </ModalContent>
        </Modal>
      </AdminWrapper>
    </Admin>
  );
};

const Admin = styled.section`
  min-height: 79vh;
  overflow: hidden;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

const AdminWrapper = styled.div`
  @media (max-width: 1024px) {
    padding: 0 50px;
  }
  @media (max-width: 700px) {
    padding: 0 20px;
  }
  @media (max-width: 350px) {
    padding: 0 10px;
  }
`;

const Article = styled.article``;

const NavDiv = styled.div`
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

const EditBox = styled.article`
  padding: 30px 0;
`;

const EditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  position: relative;
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Modal = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  position: relative;
  #close {
    position: absolute;
    right: 10px;
    top: 5px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    margin: 30% auto;
  }
  @media (max-width: 600px) {
    margin: 40% auto;
  }
  @media (max-width: 486px) {
    margin: 60% auto;
  }
`;