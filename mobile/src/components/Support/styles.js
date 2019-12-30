import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

export const Status = styled.Text`
  font-weight: bold;
  color: ${props => (props.status ? '#42CB59' : '#999999')};
`;

export const Data = styled.Text`
  color: #666666;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666666;
`;
