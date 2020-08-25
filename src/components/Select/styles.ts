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
  padding: 6px;
  padding-left: 16px;
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

  .select-container {
    flex: 1;

    .select__control {
      background: transparent;
      border: 0;

      .select__placeholder {
        color: #000;
      }

      &.select__control--is-focused {
        box-shadow: none;
      }
    }
  }

  svg {
    margin-right: 4px;
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
