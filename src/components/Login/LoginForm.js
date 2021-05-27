import React from 'react';
import Button from '../Common/StyledButton';
import styled from 'styled-components';

const LoginForm = ({
  type,
  form,
  onChange,
  onSubmit,
  onLogout,
  user,
  error,
}) => {
  return (
    <LoginBlock>
      {user ? (
        <>
          <span>
            {user.name}
            {'님 반갑습니다'}
          </span>
          <StyledButton
            cyan
            variant='contained'
            type='button'
            onClick={onLogout}
          >
            로그아웃
          </StyledButton>
        </>
      ) : (
        <Form onSubmit={onSubmit}>
          <InputBox
            id='id'
            name='id'
            type='text'
            value={form.id}
            onChange={onChange}
            required
          />
          <InputBox
            required
            value={form.password}
            onChange={onChange}
            name='password'
            type='password'
            id='password'
          />
          <StyledButton cyan variant='contained' type='submit'>
            로그인
          </StyledButton>
        </Form>
      )}
    </LoginBlock>
  );
};

const LoginBlock = styled.div`
  position: absolute;
  top: 25px;
  right: 200px;
`;

const Form = styled.form`
  display: inline-flex;
`;

const InputBox = styled.input`
  width: 100px;
  height: 30px;
  margin: 0 5px;
`;

const StyledButton = styled(Button)`
  height: 35px;
`;

export default LoginForm;
