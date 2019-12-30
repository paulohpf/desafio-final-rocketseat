import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #444444;
`;

export const Data = styled.Text`
  color: #666666;
`;
