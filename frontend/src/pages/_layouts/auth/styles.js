import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  padding: 60px 30px;
  width: 100%;
  max-width: 360px;
  text-align: center;
  border: 0;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      text-transform: uppercase;

      span {
        color: #de3b3b;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      background: #ee4d64;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
