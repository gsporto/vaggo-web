import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #d2d9e4;
  border-radius: 10px;
  border: 2px solid #d2d9e4;
  padding: 16px;
  width: 100%;
  color: #000;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #1c56ac;
      border-color: #1c56ac;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #1c56ac;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;

    &::placeholder {
      color: #000;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #d2d9e4;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
