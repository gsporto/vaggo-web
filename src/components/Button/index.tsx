import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Input: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => (
  <Container type="button" disabled={disabled || loading} {...props}>
    {loading ? 'Aguarde...' : children}
  </Container>
);

export default Input;
