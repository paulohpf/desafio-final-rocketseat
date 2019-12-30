import styled from 'styled-components';

import { Form, Input } from '@rocketseat/unform';

export const AnswerForm = styled(Form)`
  width: 100%;

  h3 {
    font-size: 14px;
    color: #444444;
    padding-bottom: 8px;

    &:not(:first-child) {
      padding-top: 8px;
    }
  }
`;

export const AnswerTextArea = styled(Input)`
  border: 1px solid #dddddd;
  color: #666666;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  resize: none;
`;

export const SendButton = styled.button`
  border: none;
  background: #ee4d64;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 18px;
  border-radius: 4px;
  margin-top: 10px;
`;
