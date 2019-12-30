import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import api from '~/services/api';

import { Container, List, Pagination } from './styles';

export default function Students() {
  const [data, setData] = useState({});
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('students', {
        params: { searchText, page },
      });

      const { rows: studentsRows, ...rest } = response.data;

      setStudents(studentsRows);
      setData(rest);
    };

    getData();
  }, [page, searchText]);

  const handleOnChange = e => {
    setSearchText(e.target.value);
  };

  const handleChangePage = value => {
    if (value >= 1) {
      setPage(value);
    }
  };

  return (
    <Container>
      <header>
        <h2>Gerenciando Alunos</h2>

        <div>
          <Link to="/student/add">
            <FiPlus size={16} />
            Cadastrar
          </Link>
          <input
            type="text"
            placeholder="Buscar aluno"
            value={searchText}
            onChange={handleOnChange}
          />
        </div>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Nome</strong>
              </th>
              <th>
                <strong>E-mail</strong>
              </th>
              <th>
                <strong>Idade</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td className="actions">
                  <Link className="edit" to={`/student/edit/${student.id}`}>
                    editar
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
