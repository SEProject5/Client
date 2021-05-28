import React from 'react';
import { useState } from 'react';
import client from '../../../lib/api/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  paper: {
    maxWidth: 936,
    margin: '20px auto',
    overflow: 'hidden',
    boxShadow: `0px 2px 13px rgba(42, 64, 139, 0.3)`,
    borderRadius: `15px`,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  title: {
    marginTop: '20px',
    marginBottom: '10px',
    marginLeft: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  dateGrid: {
    marginLeft: '20px',
  },
  dateSelector: {
    marginRight: '20px',
  },
  resize: {
    fontSize: '14px',
  },
  upload: {
    width: '120px',
    height: '50px',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    borderRadius: '20px',
    margin: '20px auto',
  },
});

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(Button);

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Notice (props) {
  const { classes, setState } = props;
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [startDate, setStartDate] = useState(new Date('2021-11-14T21:11:54'));
  const [endDate, setEndDate] = useState(new Date('2021-11-19T21:11:54'));
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleNoticeText = e => {
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

  const submitForm = () => {
    const formData = new FormData();
    formData.append('title', noticeTitle);
    formData.append('description', noticeContent);
    formData.append('banner_type', 'notice');
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('img', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log(startDate);
    try {
      client
        .post('/banner', formData, config)
        .then(response => {
          if (response.status !== 200) {
            alert('공지 등록 실패');
            return;
          }
          setNoticeTitle('');
          setNoticeContent('');
          setFile(null);
          setPreviewUrl(null);
          alert('공지가 등록되었습니다');
          setState(new Number(0));
        })
        .catch(error => {
          alert('공지 등록 실패');
        });
    } catch (e) {
      console.error(e);
    }
    console.log('공지 등록 실행');
  };
  function processImage (event) {
    const imageFile = event.target.files[0];
    setFile(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(imageUrl);
  }

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <form className={classes.root} noValidate autoComplete='off'>
            <Typography className={classes.title} variant='h4' component='h4'>
              공지사항 제목
            </Typography>
            <TextField
              id='outlined-full-width'
              style={{ margin: 8 }}
              placeholder='제목을 입력하세요.'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.resize } }}
              variant='outlined'
              value={noticeTitle}
              onChange={handleNoticeTitle}
            />
            <Typography className={classes.title} variant='h4' component='h4'>
              공지사항 내용
            </Typography>
            <TextField
              id='outlined-full-width'
              style={{ margin: 8 }}
              placeholder='공지사항을 입력하세요.'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.resize } }}
              variant='outlined'
              value={noticeContent}
              onChange={handleNoticeText}
            />
            <Typography className={classes.title} variant='h4' component='h4'>
              유효 기간
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='flex-start' className={classes.dateGrid}>
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
              </Grid>
            </MuiPickersUtilsProvider>
            <BannerBlock>
              <label className={classes.upload} htmlFor='input-file'>
                <p>이미지 업로드</p>
              </label>
              {previewUrl && (
                <PreviewImg src={previewUrl} alt='preview image' />
              )}
              <input
                type='file'
                name='img'
                id='input-file'
                accept='image/*'
                onChange={processImage}
                style={{ display: 'none' }}
              />
            </BannerBlock>
            <ButtonBlock>
              <ColorButton
                variant='contained'
                color='primary'
                className={classes.margin}
                onClick={submitForm}
              >
                등록하기
              </ColorButton>
            </ButtonBlock>
          </form>
        </div>
      </Paper>
    </>
  );
}

const PreviewImg = styled.img`
  height: 200px;
`;

const BannerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const Input = styled.input`
  margin: 20px auto;
`;

Notice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notice);
