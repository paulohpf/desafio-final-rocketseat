import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, EditForm } from './styles';

export default function PlanEdit({ match, history }) {
  const schema = Yup.object().shape({
    title: Yup.string().required('O Titulo é obrigatório'),
    duration: Yup.number()
      .required('A duração é obrigatória')
      .typeError('A duração deve ser um número'),
    price: Yup.number()
      .required('O preço mensal é obrigatório')
      .typeError('O preço mensal deve ser um número'),
  });

  const { params } = match;
  const { push } = history;

  const [plan, setPlan] = useState({});

  const [totalPrice, setTotalPrice] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (params.id) {
      const getPlans = async () => {
        const response = await api.get(`plan/${params.id}`).then(({ data }) => {
          setPrice(data.price);
          setDuration(data.duration);
          setTotalPrice(data.price * data.duration);
          return data;
        });

        setPlan(response);
      };

      getPlans();
    }
  }, [params.id]);

  const handleSubmit = data => {
    if (params.id) {
      api
        .put(`plans`, { id: params.id, ...data })
        .then(() => {
          toast.success('Salvo com sucesso');
          push('/plans');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    } else {
      api
        .post(`plans`, { ...data })
        .then(() => {
          push('/plans');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    }
  };

  const handleChangeDuration = value => {
    setDuration(value);
    setTotalPrice(price * value);
  };

  const handleChangePrice = value => {
    setPrice(value);
    setTotalPrice(value * duration);
  };

  return (
    <Container>
      <header>
        <h2>{params.id ? 'Edição de plano' : 'Cadastro de plano'}</h2>

        <div>
          <Link to="/plans">
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
        initialData={plan}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <span htmlFor="title">
          TÍTULO DO PLANO
          <Input name="title" />
        </span>
        <div>
          <span htmlFor="duration">
            DURAÇÃO (em meses)
            <Input
              name="duration"
              value={duration}
              onChange={event => handleChangeDuration(event.target.value)}
            />
          </span>
          <span htmlFor="price">
            PREÇO MENSAL
            <Input
              name="price"
              value={price}
              onChange={event => handleChangePrice(event.target.value)}
            />
          </span>
          <span>
            PREÇO TOTAL
            <Input name="totalprice" value={totalPrice} disabled />
          </span>
        </div>
      </EditForm>
    </Container>
  );
}

PlanEdit.defaultProps = {
  match: {},
};

PlanEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
