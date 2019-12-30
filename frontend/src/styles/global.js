import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 0;
}

html, body, #root {
  height: 100%;
}

body {
  background: #eceef3;
  -webkit-font-smithing: antialiased;
}

body, input, button {
  font: 14px 'Roboto', sans-serif
}

input, select {
        width: 100%;
        border: 1px solid #dddddd;
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        margin: 10px 0;



        &::placeholder {
          color: #999999;
        }
      }

a {
  text-decoration:none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}

h2 {
  color: #444444;
}
`;
