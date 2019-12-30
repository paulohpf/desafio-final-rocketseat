import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;

  padding: 15px 30px 0;
`;

export const AddButton = styled(Button)``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 15 },
})``;
