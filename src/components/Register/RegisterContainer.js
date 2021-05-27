import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  changeField,
  initializeForm,
  register,
  login,
} from '../../modules/auth';
import RegisterForm from './RegisterForm';
// import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';
import { checkId, checkEmail } from '../../lib/api/auth';

const RegisterContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [isOverlapId, setIsOverlapId] = useState(false);
  const [isOverlapEmail, setIsOverlapEmail] = useState(false);

  const chk_password = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      })
    );
  };

  const checkOverlapId = async () => {
    const { id } = form;
    if (id === '') {
      alert('아이디를 입력하세요');
      return;
    }
    // checkId({ id }).then(response => setIsOverlapId(!response));
    alert('사용 가능한 아이디입니다.');
    setIsOverlapId(false);
  };

  const checkOverlapEmail = () => {
    const { email } = form;
    if (email === '') {
      alert('이메일을 입력하세요');
      return;
    }
    // checkEmail({ email }).then(response => setIsOverlapEmail(!response));
    alert('사용 가능한 이메일입니다.');
    setIsOverlapEmail(false);
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { name, id, email, password, passwordConfirm } = form;
    // 하나라도 비어있다면
    if ([name, id, email, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' })
      );
      return;
    }

    if (!chk_password.test(password)) {
      setError('올바른 비밀번호를 입력하세요');
      return;
    }
    if (isOverlapId || isOverlapEmail) {
      setError('중복 확인이 필요합니다.');
      return;
    }
    dispatch(register({ name, id, email, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // // 회원가입 성공 / 실패 처리
  // useEffect(() => {
  //   if (authError) {
  //     // 계정명이 이미 존재할 때
  //     if (authError.response.status === 409) {
  //       setError('이미 존재하는 계정명입니다.');
  //       return;
  //     }
  //     // 기타 이유
  //     setError('회원가입 실패');
  //     return;
  //   }

  //   if (auth) {
  //     console.log('회원가입 성공');
  //     console.log(auth);
  //     dispatch(check());
  //   }
  // }, [auth, authError, dispatch]);

  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <RegisterForm
          type='register'
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          checkOverlapId={checkOverlapId}
          checkOverlapEmail={checkOverlapEmail}
          chk_password={chk_password}
          error={error}
        />
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

const AuthTemplateBlock = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px #bbb;
  padding: 2rem;
  width: 360px;
  border-radius: 25px;
`;
export default withRouter(RegisterContainer);
