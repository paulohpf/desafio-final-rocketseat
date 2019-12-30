import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Select } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
import DatePicker from '~/components/DatePicker';
import api from '~/services/api';

import 'react-datepicker/dist/react-datepicker.css';

import { Container, EditForm } from './styles';

export default function EnrollmentEdit({ match, history }) {
  const schema = Yup.object().shape({
    student_id: Yup.string().required('O aluno é obrigatório'),
    plan_id: Yup.string().required('O plano é obrigatório'),
    start_date: Yup.string('Insira uma data')
      .required('A idade é obrigatória')
      .typeError('Insira uma data válida'),
  });

  const { params } = match;
  const { push } = history;

  const [enrollment, setEnrollment] = useState({
    start_date: new Date(),
  });

  const [loading, setLoading] = useState(true);
  const [studentOptions, setStudentOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const [planId, setPlanId] = useState(null);
  const [planDuration, setPlanDuration] = useState('');
  const [endDate, setEndDate] = useState('');

  // Campos Aluno/Plano
  useEffect(() => {
    const getData = async () => {
      const toastId = 'getData';

      toast.info('Aguarde', { toastId, autoClose: false });

      const [students, plans] = await Promise.all([
        api.get(`students`),
        api.get(`plans`),
      ]);

      const _studentOptions = [];
      const _planOptions = [];

      students.data.rows.forEach(student =>
        _studentOptions.push({
          id: student.id,
          title: student.name,
        })
      );

      setStudentOptions(_studentOptions);

      plans.data.rows.forEach((plan, index) =>
        _planOptions.push({
          id: index,
          plan_id: plan.id,
          title: plan.title,
          price: plan.price,
          duration: plan.duration,
        })
      );

      setPlanOptions(_planOptions);

      if (params.id) {
        const enroll = await api.get(`enroll/${params.id}`);

        const { data } = enroll;

        // Data Inicial
        setStartDate(new Date(data.start_date));
        data.start_date = new Date(data.start_date); // Preciso fazer isso por causa do DatePicker

        // Data Final
        setEndDate(format(new Date(data.end_date), 'dd/MM/yyyy'));

        if (data.plan) {
          setPlanDuration(data.plan.duration);
        } else {
          setPlanDuration(null);
        }

        setTotalPrice(data.price);

        if (data.plan) {
          const currentPlan = _planOptions.filter(item => {
            return item.plan_id === data.plan_id;
          });

          data.plan_id = String(currentPlan[0].id); // O Select precisa ser String
        }

        setEnrollment(data);
      }

      setLoading(false);
      toast.dismiss(toastId);
    };

    getData();
  }, [params]);

  const handleSubmit = data => {
    const requestData = {
      student_id: data.student_id,
      plan_id: planId,
      start_date: data.start_date,
    };

    if (params.id) {
      api
        .put(`enroll`, { id: params.id, ...requestData })
        .then(() => {
          toast.success('Salvo com sucesso');
          push('/enrollments');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    } else {
      api
        .post(`enroll`, { ...requestData })
        .then(() => {
          push('/enrollments');
        })
        .catch(() => {
          toast.error('Ocorreu um erro');
        });
    }
  };

  const onSelectPlan = value => {
    const { plan_id, duration, price } = planOptions[value];

    setPlanDuration(duration);

    setTotalPrice(duration * price);

    setEndDate(format(addMonths(startDate, duration), 'dd/MM/yyyy'));

    setPlanId(plan_id);
  };

  const onSelectDate = value => {
    setStartDate(value);
    setEndDate(format(addMonths(value, planDuration), 'dd/MM/yyyy'));
  };

  if (loading) return null;

  return (
    <Container>
      <header>
        <h2>{params.id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h2>

        <div>
          <Link to="/enrollments">
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
        initialData={enrollment}
        schema={schema}
        context
        onSubmit={handleSubmit}
      >
        <span htmlFor="student_id">
          ALUNO
          <Select
            name="student_id"
            options={studentOptions}
            placeholder="Buscar aluno"
            disabled={params.id}
          />
        </span>
        <div>
          <span htmlFor="plan_id">
            PLANO
            <Select
              name="plan_id"
              options={planOptions}
              placeholder="Selecione o plano"
              onChange={e => onSelectPlan(e.target.value)}
            />
          </span>
          <span htmlFor="start_date">
            DATA DE INÍCIO
            <DatePicker
              name="start_date"
              placeholder="Escolha a data"
              onChange={onSelectDate}
            />
          </span>
          <span htmlFor="end_date">
            DATA DE TÉRMINO
            <input name="end_date" value={endDate} disabled />
          </span>
          <span htmlFor="totalPrice">
            VALOR FINAL
            <input name="totalPrice" value={totalPrice} disabled />
          </span>
        </div>
      </EditForm>
    </Container>
  );
}

EnrollmentEdit.defaultProps = {
  match: {},
};

EnrollmentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
