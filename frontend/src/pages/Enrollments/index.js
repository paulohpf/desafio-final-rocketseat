import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdCheckCircle,
} from 'react-icons/md';
import api from '~/services/api';

import { Container, List, Pagination } from './styles';

export default function Enrollments() {
  const [data, setData] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('enroll', { params: { page } });

      const { rows: enrollmentsRows, ...rest } = response.data;

      setData(rest);
      setEnrollments(enrollmentsRows);
    };

    getData();
  }, [page]);

  const handleChangePage = value => {
    if (value >= 1) {
      setPage(value);
    }
  };

  return (
    <Container>
      <header>
        <h2>Gerenciando matrículas</h2>

        <div>
          <Link to="/enrollment/add">
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
                <strong>Aluno</strong>
              </th>
              <th>
                <strong>Plano</strong>
              </th>
              <th>
                <strong>Início</strong>
              </th>
              <th>
                <strong>Término</strong>
              </th>
              <th>
                <strong>Ativa</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map(plan => (
              <tr key={plan.id}>
                <td>{plan.student.name}</td>
                <td>{plan.plan ? plan.plan.title : ''}</td>
                <td>
                  {format(new Date(plan.start_date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBrLocale,
                  })}
                </td>
                <td>
                  {format(new Date(plan.end_date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBrLocale,
                  })}
                </td>
                <td>
                  {plan.active ? (
                    <MdCheckCircle color="#42cb59" size={20} />
                  ) : (
                    <MdCheckCircle color="#dddddd" size={20} />
                  )}
                </td>
                <td className="actions">
                  <Link className="edit" to={`/enrollment/edit/${plan.id}`}>
                    editar
                  </Link>
                  <Link className="delete" to="/#">
                    apagar
                  </Link>
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

Enrollments.defaultProps = {
  match: {},
};
