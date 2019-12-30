import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;

  padding: 15px 30px 0;
`;

export const Content = styled.View`
  display: flex;
  background: #fff;

  border: 1px solid #dddddd;
  border-radius: 4px;

  padding: 15px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #444444;
  font-weight: bold;
`;

export const Data = styled.Text`
  color: #666666;
`;

export const Message = styled.Text`
  color: #666666;
  line-height: 25;
  text-align: justify;
`;

export const Question = styled.View`
  margin-bottom: 15px;
`;

export const Answer = styled.View``;
