import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;

  padding: 15px 30px 0;
`;

export const AddButton = styled(Button)``;

export const Question = styled(Input).attrs({
  numberOfLines: 10,
  textAlignVertical: 'top',
  multiline: true,
})`
  margin-bottom: 15px;

  text-align: center;
`;
