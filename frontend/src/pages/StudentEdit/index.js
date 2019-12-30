import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, EditForm } from './styles';

export default function StudentEdit({ match, history }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O e-mail é obrigatório'),
    age: Yup.number()
      .required('A idade é obrigatória')
      .typeError('A idade deve ser um número'),
    weight: Yup.number()
      .required('O peso é obrigatório')
      .typeError('O peso deve ser um número'),
    height: Yup.string().required('A altura é obrigatória'),
  });

  const { params } = match;
  const { push } = history;

  const [student, setStudent] = useState({});

  useEffect(() => {
    if (params.id) {
      const getStudents = async () => {
        const response = await api.get(`student/${params.id}`);

        setStudent(response.data);
      };

      getStudents();
    }
  }, [params.id]);

  const handleSubmit = data => {
    if (params.id) {
      api
        .put(`students`, { id: params.id, ...data })
        .then(() => {
          toast.success('Salvo com sucesso');
          push('/students');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    } else {
      api
        .post(`students`, { ...data })
        .then(() => {
          push('/students');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    }
  };

  return (
    <Container>
      <header>
        <h2>{params.id ? 'Edição de aluno' : 'Cadastro de aluno'}</h2>

        <div>
          <Link to="/students">
            <MdKeyboardArrowLeft size={16} />
            Voltar
          </Link>
          <button form="form" type="submit">
            <MdCheck size={16} /> Salvar
          </button>
        </div>
      </header>

      <EditForm
        id="form"
        initialData={student}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <span htmlFor="name">
          NOME COMPLETO
          <Input name="name" placeholder="John Doe" />
        </span>
        <span htmlFor="email">
          ENDEREÇO DE E-MAIL
          <Input name="email" placeholder="exemplo@email.com" />
        </span>
        <div>
          <span htmlFor="age">
            IDADE
            <Input name="age" />
          </span>
          <span htmlFor="weight">
            PESO (em kg)
            <Input name="weight" />
          </span>
          <span htmlFor="height">
            ALTURA
            <Input name="height" />
          </span>
        </div>
      </EditForm>
    </Container>
  );
}

StudentEdit.defaultProps = {
  match: {},
};

StudentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
