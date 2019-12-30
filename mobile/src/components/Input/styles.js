import styled from 'styled-components/native';

export const Container = styled.View`
  min-height: 46px;
  flex-direction: row;
  align-items: center;
  background: #fff;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  padding: 15px;
  flex: 1;
  font-size: 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;

  align-items: flex-start;
`;
