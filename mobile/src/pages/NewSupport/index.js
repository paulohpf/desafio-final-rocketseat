import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert } from 'react-native';

import api from '~/services/api';

import { Container, AddButton, Question } from './styles';

export default function NewSupport(props) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const studentId = useSelector(state => state.auth.studentId);

  const handleChangeQuestion = value => {
    setQuestion(value);
  };

  const handleAddSupport = async () => {
    if (question !== '') {
      try {
        const { navigation } = props;

        setLoading(true);

        await api.post(`/students/${studentId}/help-orders`, {
          question,
        });

        setLoading(false);

        navigation.goBack();
      } catch (err) {
        Alert.alert('Ocorreu um erro', 'Não foi possível solicitar suporte');
        setLoading(false);
      }
    } else {
      Alert.alert('Campo vazio', 'Você precisa fazer uma pergunta');
    }
  };

  return (
    <Container>
      <Question
        placeholder="Inclua seu pedido de auxílio"
        value={question}
        onChangeText={handleChangeQuestion}
      />
      <AddButton loading={loading} onPress={handleAddSupport}>
        Enviar Pedido
      </AddButton>
    </Container>
  );
}
