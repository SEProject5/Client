import React, {useState} from 'react';
import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Fuse from 'fuse.js'
import RangeBar from './RangeBar';

export default function Search() {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState({min:0,max:100000});
  
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeProduct = (event) => {
    setProductName(event.target.value);
  };

  const searchProduct = () => {
    const data = {category:category, name:productName, price:price};
    console.log(data);
  }

  return (
    <>
      <TitleBlock>
        <h3>[상품 상세 검색]</h3>
      </TitleBlock>
      <SearchBlock>
        <FormControl className={classes.margin}>
          <InputLabel id="label">카테고리</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={category}
            onChange={handleChangeCategory}
            input={<BootstrapInput />}
          >
            <MenuItem value={'outer'}>Outer</MenuItem>
            <MenuItem value={'top'}>Top</MenuItem>
            <MenuItem value={'bottom'}>Bottom</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="productName">상품명</InputLabel>
          <BootstrapInput id="product" value={productName} onChange={handleChangeProduct}/>
        </FormControl>
        <RangeBar price={price} setPrice={setPrice} />
      </SearchBlock>
      <ButtonBlock>
        <ColorButton
          color="primary"
          className={classes.margin}
          onClick={searchProduct}
        >
          상품 검색
        </ColorButton>
      </ButtonBlock>
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

const ButtonBlock = styled.div`
  width:100%;
  margin: 20px auto;
  text-align:center;
`;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#030303'),
    backgroundColor: '#030303',
    '&:hover': {
      backgroundColor: '#4d4d4d',
    },
  },
}))(Button);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['NotoSansLight','sans-serif'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));