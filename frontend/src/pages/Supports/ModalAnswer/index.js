import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { AnswerForm, AnswerTextArea, SendButton } from './styles';

export default function ModalAnswer(props) {
  const customStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      display: 'flex',
      width: '450px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '4px',
      border: 'none',
    },
  };

  const { id, openModal, onRequestClose } = props;

  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const response = await api.get(`/help-orders/${id}`);

          setModalData(response.data);
        } catch (err) {
          toast.error('Ocorreu um erro');
        }
      };

      getData();
    }
  }, [id, modalData.id]);

  const handleSubmit = async values => {
    try {
      await api.put(`/help-orders/${id}`, {
        ...values,
      });

      onRequestClose({ refresh: true });
    } catch (err) {
      toast.error('Ocoreu um erro');
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      style={customStyles}
    >
      <AnswerForm onSubmit={handleSubmit}>
        <h3>PERGUNTA DO ALUNO</h3>
        <p>{modalData.question}</p>

        <h3>SUA RESPOSTA</h3>
        <AnswerTextArea multiline name="answer" rows={6} />

        <SendButton type="submit" className="send">
          Responder Aluno
        </SendButton>
      </AnswerForm>
    </Modal>
  );
}

ModalAnswer.defaultProps = {
  id: null,
  openModal: false,
};

ModalAnswer.propTypes = {
  id: PropTypes.number,
  openModal: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
};
