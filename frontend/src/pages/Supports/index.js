import React, { useEffect, useState } from 'react';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import api from '~/services/api';

import { Container, List, Pagination } from './styles';
import ModalAnswer from './ModalAnswer/index';

export default function Supports() {
  const [data, setData] = useState({});
  const [supports, setSupports] = useState([]);
  const [page, setPage] = useState(1);

  const [supportId, setSupportId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const response = await api.get('help-orders/not-answered');

    const { rows: supportRows, ...rest } = response.data;

    setData(rest);
    setSupports(supportRows);
  };

  const handleChangePage = value => {
    if (value >= 1) {
      setPage(value);
    }
  };

  const editAnswer = async ({ id = null, refresh = false }) => {
    setOpenModal(!openModal);

    setSupportId(id);

    if (refresh) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <header>
        <h2>Pedidos de auxílio</h2>
      </header>

      <List>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Aluno</strong>
              </th>
            </tr>
          </thead>

          <tbody>
            {supports.map(support => (
              <tr key={support.id}>
                <td>{support.student.name}</td>
                <td className="actions">
                  <button
                    type="button"
                    className="answer"
                    onClick={() => {
                      editAnswer({ id: support.id });
                    }}
                  >
                    responder
                  </button>
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
      <ModalAnswer
        id={supportId}
        openModal={openModal}
        onRequestClose={editAnswer}
      />
    </Container>
  );
}
