import styled from 'styled-components';
import { darken } from 'polished';

import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    div {
      display: flex;
      vertical-align: center;
      align-items: center;

      a,
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        padding: 0 15px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;

        svg {
          margin-right: 5px;
        }
      }

      a {
        background: #cccccc;
        margin-right: 15px;

        :hover {
          background: ${darken(0.03, '#cccccc')};
        }
      }

      button {
        background: #ee4d64;

        :hover {
          background: ${darken(0.03, '#EE4D64')};
        }
      }
    }
  }
`;

export const EditForm = styled(Form)`
  background: #fff;
  padding: 16px;

  span {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #444444;

    span {
      width: 100%;
      color: red;
      margin-bottom: 15px;
    }
  }

  div {
    display: flex;
    justify-content: space-between;

    > span {
      width: 32%;
    }
  }
`;
