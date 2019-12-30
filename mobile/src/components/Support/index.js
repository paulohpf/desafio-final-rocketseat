import React from 'react';

import { parseISO, formatRelative } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Status, Data, Question } from './styles';

export default function Support({ data, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Header>
          <Status status={data.answer}>
            {data.answer ? 'Respondido' : 'Sem resposta'}
          </Status>
          <Data>
            {data.answer_at &&
              formatRelative(parseISO(data.answer_at), new Date(), {
                locale: ptbr,
                addSuffix: true,
              })}
          </Data>
        </Header>
        <Question>{data.question}</Question>
      </Container>
    </TouchableOpacity>
  );
}
