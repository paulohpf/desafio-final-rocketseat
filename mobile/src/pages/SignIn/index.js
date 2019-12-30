import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import logo from '~/assets/images/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState('');

  const handleSubmit = () => {
    dispatch(signInRequest(studentId));
  };

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          keyboardType="numeric"
          autoCorrect={false}
          returnKeyType="send"
          onSubmitEditing={() => handleSubmit}
          value={studentId}
          onChangeText={setStudentId}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
