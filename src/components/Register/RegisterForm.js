import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import StyledButton from '../Common/StyledButton';
import Button from '../Common/Button';

const RegisterForm = ({
  form,
  onChange,
  onSubmit,
  checkOverlapId,
  checkOverlapEmail,
  chk_password,
  error,
}) => {
  const text = '회원가입';
  return (
    <AuthFormBlock>
      <Title>{text}</Title>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete='name'
          name='name'
          placeholder='이름(공백 불가)'
          onChange={onChange}
          value={form.name}
        />
        <StyledInput
          autoComplete='id'
          name='id'
          placeholder='아이디'
          onChange={onChange}
          value={form.id}
        />
        <ButtonBlock>
          <StyledButton onClick={checkOverlapId}>중복확인</StyledButton>
        </ButtonBlock>
        <StyledInput
          autoComplete='email'
          name='email'
          placeholder='이메일'
          onChange={onChange}
          value={form.email}
        />
        <ButtonBlock>
          <StyledButton onClick={checkOverlapEmail}>중복확인</StyledButton>
        </ButtonBlock>
        <StyledInput
          autoComplete='new-password'
          name='password'
          placeholder='비밀번호'
          type='password'
          onChange={onChange}
          value={form.password}
          error={chk_password.test(form.password) === false}
        />
        <Description>
          {'*영문(소문자), 숫자, 특수문자 조합, 8~16자리'}
        </Description>
        <StyledInput
          autoComplete='new-password'
          name='passwordConfirm'
          placeholder='비밀번호 확인'
          type='password'
          onChange={onChange}
          value={form.passwordConfirm}
          error={form.password !== form.passwordConfirm}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </ButtonWithMarginTop>
      </form>
    </AuthFormBlock>
  );
};

const Title = styled.h3`
  text-align: center;
`;
const Description = styled.p`
  font-size: 1rem;
  color: gray;
`;
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const ButtonBlock = styled.div`
  margin: 10px 0;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  background-color: ${palette.gray[2]};
  outline: none;
  width: 100%;
  height: 40px;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  background-color: ${props => (props.error ? '#fbb' : 'none')};
`;

const ButtonWithMarginTop = styled(StyledButton)`
  margin-top: 1rem;
`;
/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export default RegisterForm;
