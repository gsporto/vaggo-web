import React, { useState, useRef, useCallback } from 'react';
import Select from 'react-select';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [modalOpen, setModalOpen] = useState(true);

  const handleSubmit = useCallback((data: any) => {}, []);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  return (
    <Container>
      <Modal isOpen={modalOpen} setIsOpen={toggleModal}>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: '85%', margin: 'auto' }}
        >
          <Input type="text" name="name" placeholder="Nome" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="number" name="age" placeholder="Idade" />
          <Input type="text" name="linkedin" placeholder="Linkedin" />
          <Button type="submit">Salvar</Button>
        </Form>
      </Modal>
    </Container>
  );
};

export default Dashboard;
