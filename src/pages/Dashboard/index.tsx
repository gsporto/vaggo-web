import React, { useState, useRef, useCallback } from 'react';
import {
  FiTerminal,
  FiLinkedin,
  FiMail,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [modalOpen, setModalOpen] = useState(true);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <Modal isOpen={modalOpen} setIsOpen={toggleModal}>
      <Container>
        <h1>Cadastrar</h1>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: '85%', margin: 'auto' }}
        >
          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <Input type="email" name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="number"
            name="age"
            icon={FiCalendar}
            placeholder="Idade"
          />
          <Input
            type="text"
            name="linkedin"
            icon={FiLinkedin}
            placeholder="Linkedin"
          />

          <Select
            name="techs"
            icon={FiTerminal}
            options={options}
            placeholder="Tecnologias"
            isMulti
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default Dashboard;
