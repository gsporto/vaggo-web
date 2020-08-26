import React, { useRef, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import {
  FiTerminal,
  FiLinkedin,
  FiMail,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

type Techs =
  | 'C#'
  | 'Javascript'
  | 'Nodejs'
  | 'Angular'
  | 'React'
  | 'Ionic'
  | 'Mensageria'
  | 'PHP'
  | 'Laravel';

interface ICandidateDTO {
  id: string;
  name: string;
  email: string;
  age: number;
  linkedin: string;
  techs: Techs[];
}

interface IModalProps {
  id?: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalEditCandidate: React.FC<IModalProps> = ({
  id,
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadCandidate(): Promise<void> {
      const candidate = await api.get<ICandidateDTO>(`/candidate/${id}`);
      const { name, email, age, linkedin, techs } = candidate.data;
      if (formRef.current) {
        formRef.current.setData({
          name,
          email,
          age,
          linkedin,
        });
        const techsParded = techs.map((techMap) => ({
          label: techMap,
          value: techMap,
        }));
        formRef.current.setFieldValue('techs', techsParded);
      }
    }
    if (id) loadCandidate();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().email().required('E-mail é obrigatório'),
          age: Yup.string().required('Idade é obrigatório'),
          linkedin: Yup.string().required('Linkedin é obrigatório'),
          techs: Yup.array(
            Yup.string().oneOf([
              'C#',
              'Javascript',
              'Nodejs',
              'Angular',
              'React',
              'Ionic',
              'Mensageria',
              'PHP',
              'Laravel',
            ]),
          ).required('Tecnologias é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put(`/candidate/${id}`, data);

        setIsOpen();
        addToast({
          type: 'success',
          title: 'Atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer cadastro, tente novamente mais tarde.',
        });
      }
    },
    [addToast, id, setIsOpen],
  );

  const options = [
    { value: 'C#', label: 'C#' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Angular', label: 'Angular' },
    { value: 'React#', label: 'React' },
    { value: 'Ionic', label: 'Ionic' },
    { value: 'Mensageria', label: 'Mensageria' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Laravel', label: 'Laravel' },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1>Atualizar</h1>
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

export default ModalEditCandidate;
