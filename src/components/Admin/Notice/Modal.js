import React, { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../lib/api/client';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import NoticeData from '../../../dummyData/NoticeData.json';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import Image from '../../Common/Image';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function (props) {
  const classes = useStyles();
  const { data, handleModal, currentId, setState } = props;

  // const { loading, data, error } = useFetch(`/banner?order=0`);
  const editData = data.filter(obj => obj.id === currentId)[0];

  const [noticeTitle, setNoticeTitle] = useState(editData.title);
  const [noticeContent, setNoticeContent] = useState(editData.description);
  const [startDate, setStartDate] = useState(editData.startDate);
  const [endDate, setEndDate] = useState(editData.endDate);
  const [file, setFile] = useState(editData.file);
  const [preview, setPreview] = useState(editData.file);

  const handleNoticeContent = e => {
    setNoticeContent(e.target.value);
  };
  const handleNoticeTitle = e => {
    setNoticeTitle(e.target.value);
  };
  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const closeModal = () => {
    handleModal(false);
  };

  const onEditSubmit = e => {
    const formData = new FormData();
    formData.append('id', currentId);
    formData.append('title', noticeTitle);
    formData.append('description', noticeContent);
    formData.append('banner_type', 'notice');
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('img', file);
    const result = {
      currentId,
      noticeTitle,
      noticeContent,
      startDate,
      endDate,
      file,
    };
    console.log(result);
    const config = {
      headers: {
        'description-type': 'multipart/form-data',
      },
    };
    try {
      client
        .patch(`/banner/${currentId}`, formData, config)
        .then(response => {
          if (response.status !== 200) {
            alert('공지 등록 실패');
            return;
          }
          setNoticeTitle('');
          setNoticeContent('');
          setFile(null);
          setPreview(null);
          alert('공지가 등록되었습니다');
        })
        .catch(error => {
          alert('공지 등록 실패');
        });
    } catch (e) {
      console.error(e);
    }
    closeModal();
    setState(new Number(0));
  };

  const changeImage = event => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setPreview(imageUrl);
  };

  return (
    <ModalBox>
      <H2>{'공지 수정'}</H2>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.notice}>
              공지 제목
            </StyledTableCell>
            <StyledTableCell className={classes.notice}>
              상세 내용
            </StyledTableCell>
            <StyledTableCell className={classes.notice}>
              미리보기
            </StyledTableCell>
            <StyledTableCell className={classes.start}>시작일</StyledTableCell>
            <StyledTableCell className={classes.end}>종료일</StyledTableCell>
            <StyledTableCell className={classes.delete}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key={editData.id}>
            <StyledTableCell component='th' scope='row'>
              <input
                type='description'
                value={noticeTitle}
                onChange={handleNoticeTitle}
              />
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
              <input
                type='description'
                value={noticeContent}
                onChange={handleNoticeContent}
              />
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
              <label htmlFor='input-edit-file'>
                <Image src={preview} alt='preview image' />
              </label>
              <input
                type='file'
                id='input-edit-file'
                accept='image/*'
                onChange={changeImage}
                style={{ display: 'none' }}
              />
            </StyledTableCell>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <StyledTableCell>
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='시작일'
                  InputProps={{ classes: { input: classes.resize } }}
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>
                <KeyboardDatePicker
                  className={classes.dateSelector}
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-dialog'
                  label='종료일'
                  format='MM/dd/yyyy'
                  InputProps={{ classes: { input: classes.resize } }}
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </StyledTableCell>
            </MuiPickersUtilsProvider>
            <StyledTableCell>
              <Button onClick={onEditSubmit}>{'등록'}</Button>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <ButtonWrap>
        <Button onClick={closeModal}>{'CLOSE'}</Button>
      </ButtonWrap>
    </ModalBox>
  );
}

const H2 = styled.h2`
  font-size: 1.2rem;
  text-align: center;
`;
const ButtonWrap = styled.div`
  text-align: center;
  margin: 20px;
`;

const Button = styled.button`
  font-size: 1rem;
  text-align: center;
  border-style: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    border-radius: 20px;
  }
`;

const ModalBox = styled.div`
  position: fixed;
  top: 30%;
  left: 25%;
  z-index: 10;
  width: 70%;
  height: 420px;
  background-color: white;
  border: 1px solid gray;
`;

const PreviewImg = styled.img`
  height: 200px;
`;

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    minWidth: 100,
    contentAlign: 'center',
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '98%',
    margin: '20px auto',
    boxShadow: `0px 2px 13px rgba(42, 64, 139, 0.3)`,
    borderRadius: `15px`,
  },
  table: {},
  notice: {
    minWidth: 150,
  },
  start: {
    minWidth: 100,
  },
  end: {
    minWidth: 100,
  },
  delete: {
    minWidth: 50,
  },
});
