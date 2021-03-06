import styled from 'styled-components';

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
    }
  }
`;

export const List = styled.div`
  table {
    width: 100%;
    text-align: left;
    padding: 0 16px
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
          width: 40px;
          text-align: right;
        }
      }

      &:not(:last-child) {
        td {
          border-bottom: 1px solid #eeeeee;
        }
      }

      .answer {
        margin-right: 8px;
        border: none;
        background: none;
        color: #4d85ee;
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
