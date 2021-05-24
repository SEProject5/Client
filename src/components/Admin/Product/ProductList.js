import React, { useEffect } from 'react';
import { useState } from 'react';
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

function createData (id, content, startDate, endDate) {
  return { id, content, startDate, endDate };
}

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
    minWidth: 400,
  },
  start: {
    minWidth: 200,
  },
  end: {
    minWidth: 200,
  },
  delete: {
    minWidth: 50,
  },
});

export default function NoticeList () {
  const classes = useStyles();
  const [data, setData] = useState([]);
  // const { loading, data, error } = useFetch(
  //     'https://localhost:8080/admin/notice'
  // );

  const getFormatDate = date => {
    const year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '/' + month + '/' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  };

  const onDelete = id => {
    console.log('실행');
    setData(data.filter(obj => obj.id !== id));
    // data = data.filter(obj => obj.id !== id);
    // fetch('https://localhost:8080/admin/post', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.log('error:', error));
  };

  const rows = data.map(obj => {
    return createData(obj.id, obj.content, obj.startDate, obj.endDate);
  });
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.notice}>
              공지사항
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
                  {row.content}
                </StyledTableCell>
                <StyledTableCell>
                  {getFormatDate(new Date(row.startDate))}
                </StyledTableCell>
                <StyledTableCell>
                  {getFormatDate(new Date(row.endDate))}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label='delete'
                    onClick={() => onDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
