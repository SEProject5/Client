import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import LoginForm from './LoginForm';
import { logout } from '../../modules/user';

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { id, password } = form;
    dispatch(login({ id, password }));
  };

  const onLogout = () => {
    dispatch(logout());
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     try {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       if (user.user_type === 'admin') {
  //         history.push('/admin');
  //       } else {
  //         history.push('/');
  //       }
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [history, user]);

  return (
    <LoginForm
      type='login'
      form={form}
      user={user}
      onChange={onChange}
      onSubmit={onSubmit}
      onLogout={onLogout}
      error={error}
    />
  );
};

export default withRouter(LoginContainer);
