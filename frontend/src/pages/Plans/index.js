import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import api from '~/services/api';

import { Container, List, Pagination } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  const handleDeletePlan = async id => {
    const toastId = 'handleDeletePlan';

    try {
      toast.info('Aguarde um momento', {
        autoClose: false,
        toastId,
      });

      await api.delete(`plans/${id}`);

      toast.dismiss(toastId);
      toast.success('Plano removido');

      setPage(1);
    } catch (err) {
      toast.error('Ocorreu um erro');
    }
  };

  const handleChangePage = value => {
    if (value >= 1) {
      setPage(value);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('plans', { params: { page } });

      const { rows: plansRows, ...rest } = response.data;

      setPlans(plansRows);
      setData(rest);
    };

    getData();
  }, [page]);

  return (
    <Container>
      <header>
        <h2>Gerenciando planos</h2>

        <div>
          <Link to="/plan/add">
            <FiPlus size={16} />
            Cadastrar
          </Link>
        </div>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Título</strong>
              </th>
              <th>
                <strong>Duração</strong>
              </th>
              <th>
                <strong>VALOR p/ MÊS</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>R${plan.price}</td>
                <td className="actions">
                  <div>
                    <Link className="edit" to={`/plan/edit/${plan.id}`}>
                      editar
                    </Link>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        handleDeletePlan(plan.id);
                      }}
                    >
                      apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </List>
      <Pagination>
        <button
          type="button"
          onClick={() => {
            handleChangePage(page - 1);
          }}
          disabled={page === 1}
        >
          <MdNavigateBefore size={16} />
        </button>
        <h4>
          {page} de {data.totalPages}
        </h4>
        <button
          type="button"
          onClick={() => {
            handleChangePage(page + 1);
          }}
          disabled={page === data.totalPages}
        >
          <MdNavigateNext size={16} />
        </button>
      </Pagination>
    </Container>
  );
}
