import React, {useState} from 'react';
import client from '../../lib/api/client';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Input from '../Common/Input';

export default function Search({setData}) {
  const classes = useStyles();

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
        const response = await client.post(`http://ec2-13-125-128-80.ap-northeast-2.compute.amazonaws.com:3001${url}`, {
          lowPrice: lowPrice,
          highPrice: highPrice,
        })
        setData(response.data);
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
    setLowPrice(Number(e.target.value));
  };
  const handleHighPrice = e => {
    setHighPrice(Number(e.target.value));
  };

  return (
    <>
      <TitleBlock>
        <h3>[상품 상세 검색]</h3>
      </TitleBlock>
      <SearchBlock>
              <Input
                placeholder={'상품명 검색'}
                id={'searchTitle'}
                value={searchTitle}
                onChange={handleSearchTitle}
              />
              <Input
                placeholder={'최소 가격'}
                id={'lowPrice'}
                type={'number'}
                value={lowPrice}
                onChange={handleLowPrice}
              />
              <Input
                placeholder={'최대 가격'}
                id={'highPrice'}
                type={'number'}
                value={highPrice}
                onChange={handleHighPrice}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>가격 정렬</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={searchPrice}
                  onChange={handleSearchPrice}
                >
                  <MenuItem value={'DESC'}>내림차순</MenuItem>
                  <MenuItem value={'ASC'}>오름차순</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={onSearch}> 검색 </Button>
            </SearchBlock>
    </>
  );
}

const TitleBlock = styled.div`
  text-align: center;
`;

const SearchBlock = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: baseline;
`;



const useStyles = makeStyles((theme) => (
  createStyles({
    formControl: {
      margin: '40px',
      minWidth: 120,
    },
  })
));