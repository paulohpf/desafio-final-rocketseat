import styled from 'styled-components';
import { darken } from 'polished';

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

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        margin-right: 15px;
        padding: 0 15px;
        font-weight: bold;
        background: #ee4d64;

        :hover {
          background: ${darken(0.03, '#ee4d64')};
        }

        svg {
          margin-right: 5px;
        }
      }

      input {
        height: 36px;
        padding: 0 15px;
        border-radius: 4px;
        border: 1px solid #dddddd;

        ::placeholder {
          color: #999999;
        }
      }
    }
  }
`;

export const List = styled.div`
  table {
    width: 100%;
    text-align: left;
    padding: 0 16px;
    border-radius: 4px 4px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;

    tr {
      th {
        color: #444444;
        text-align: left;
        padding: 16px 0;
        overflow-wrap: break-word;
        text-transform: uppercase;
      }

      td {
        color: #666666;
        text-align: left;
        padding: 16px 0;
        overflow-wrap: break-word;

        &.actions {
          div {
            width: 30px;
            text-align: right;
            display: flex;
          }
        }
      }

      &:not(:last-child) {
        td {
          border-bottom: 1px solid #eeeeee;
        }
      }

      .edit {
        margin-right: 8px;
        color: #4d85ee;
      }

      .delete {
        border: 0;
        background: none;
        color: #de3b3b;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 15px;

  button {
    background: #ee4d64;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px;

    &:disabled {
      opacity: 0.5;
    }
  }
`;
