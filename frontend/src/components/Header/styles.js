import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  background: #ffffff;
  border: #dddddd;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  img {
    width: 135px;
  }

  .nav {
    display: flex;
  }
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }
`;

export const NavLinks = styled.ul`
  display: flex;

  li + li {
    padding: 0 0 0 15px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: bold;
  color: #999999;
  text-transform: uppercase

  &:hover {
    color: #444444;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    button {
      background: none;
      border: none;
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
    }
  }
`;
