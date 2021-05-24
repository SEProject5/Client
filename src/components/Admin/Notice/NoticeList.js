import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../../../lib/api/useFetch';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NoticeData from '../../../dummyData/NoticeData.json';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import Modal from './Modal';

export default function NoticeList () {
  const classes = useStyles();
  const [data, setData] = useState(NoticeData);
  // const { loading, data, error } = useFetch('/banner?order=0');
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const getFormatDate = date => {
    const year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '/' + month + '/' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const onEdit = id => {
    handleModal();
    setCurrentId(id);
  };

  const deleteFetch = url => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('error:', error));
  };

  const onDelete = id => {
    deleteFetch(`/banner/:${id}`);
  };

  function createData (id, title, content, startDate, endDate, url) {
    return { id, title, content, startDate, endDate, url };
  }
  const rows = data.map(obj => {
    return createData(
      obj.id,
      obj.title,
      obj.content,
      obj.startDate,
      obj.endDate,
      obj.url
    );
  });
  return (
    <TableContainer className={classes.root} component={Paper}>
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
          {/* {!loading && */}
          {rows &&
            rows.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component='th' scope='row'>
                  {row.title}
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  {row.content}
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <PreviewImg src={row.url} alt='preview image' />
                </StyledTableCell>
                <StyledTableCell>
                  {getFormatDate(new Date(row.startDate))}
                </StyledTableCell>
                <StyledTableCell>
                  {getFormatDate(new Date(row.endDate))}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label='edit' onClick={() => onEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => onDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {modal && <Modal handleModal={handleModal} currentId={currentId} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
  table: {
    minWidth: 700,
  },
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
