import React, { useEffect, useState } from 'react';

import { parseISO, formatRelative } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Content,
  Question,
  Answer,
  Header,
  Title,
  Data,
  Message,
} from './styles';

import api from '~/services/api';

export default function SupportAnswer({ navigation }) {
  const [support, setSupport] = useState({});
  const [loading, setLoading] = useState(true);

  const supportId = navigation.getParam('supportId', null);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/students/help-orders/${supportId}`, {
        params: { id: supportId },
      });

      setSupport(response.data);
      setLoading(false);
    };

    getData();
  }, [supportId]);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <Container>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Question>
            <Header>
              <Title>PERGUNTA</Title>

              <Data>
                {formatRelative(parseISO(support.createdAt), new Date(), {
                  locale: ptbr,
                  addSuffix: true,
                })}
              </Data>
            </Header>
            <Message>{support.question}</Message>
          </Question>
          {support.answer && (
            <Answer>
              <Header>
                <Title>RESPOSTA</Title>
                <Data>
                  {formatRelative(parseISO(support.answer_at), new Date(), {
                    locale: ptbr,
                    addSuffix: true,
                  })}
                </Data>
              </Header>
              <Message>{support.answer}</Message>
            </Answer>
          )}
        </ScrollView>
      </Content>
    </Container>
  );
}
