import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Form } from '@unform/web';

import {
  FiTrash2,
  FiEdit3,
  FiMail,
  FiLinkedin,
  FiCalendar,
  FiTerminal,
} from 'react-icons/fi';

import Button from '../../components/Button';
import Select from '../../components/Select';
import api from '../../services/api';

import { useCreateCandidate } from '../../hooks/CreateCandidate';
import { useToast } from '../../hooks/toast';

import { Container, CandidateItens, Header } from './styles';
import { useEditCandidate } from '../../hooks/EditCandidate';

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

interface iOption {
  label: string;
  value: Techs;
}

const Dashboard: React.FC = () => {
  const { openCreateCandidate, isOpenCreateCandidate } = useCreateCandidate();
  const { openEditCandidate, isOpenEditCandidate } = useEditCandidate();
  const { addToast } = useToast();

  const [searchSelected, setSearchSelected] = useState<Techs[]>([]);
  const [candidatesList, setCandidatesList] = useState<ICandidateDTO[]>([]);

  useEffect(() => {
    async function loadCandidates(): Promise<void> {
      try {
        const candidates = await api.get<ICandidateDTO[]>('/candidates');
        const { data } = candidates;
        setCandidatesList([...data]);
      } catch (error) {
        if (error.message === 'expired-token') {
          addToast({
            type: 'error',
            title: 'Token invalido ou expirado',
            description: 'Acesse sua conta novamente.',
          });
        }
      }
    }
    if (!isOpenCreateCandidate && !isOpenEditCandidate) loadCandidates();
  }, [addToast, isOpenCreateCandidate, isOpenEditCandidate]);

  const openModal = useCallback(() => {
    openCreateCandidate();
  }, [openCreateCandidate]);

  const openModalEdit = useCallback(
    (id: string) => {
      openEditCandidate(id);
    },
    [openEditCandidate],
  );

  const handleSelect = useCallback(
    (e) => {
      const eventValue = e as iOption[];
      if (eventValue) {
        const value = eventValue.map((selectMap) => selectMap.value || '');
        setSearchSelected([...value]);
      }
    },
    [setSearchSelected],
  );

  const candidatesFiltered = useMemo(() => {
    const filtered = candidatesList.filter((candidateToBeFilter) => {
      return searchSelected.every((v) => candidateToBeFilter.techs.includes(v));
    });
    return filtered;
  }, [candidatesList, searchSelected]);

  const handleDelete = useCallback(
    async (id) => {
      await api.delete(`/candidate/${id}`);
      const newList = candidatesList.filter((item) => item.id !== id);
      setCandidatesList(newList);
    },
    [candidatesList],
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
    <Container>
      <Header>
        <nav>vaggo</nav>
        <Form onSubmit={() => null}>
          <menu>
            <strong>Candidatos disponíveis</strong>
            <Button type="button" onClick={openModal}>
              Criar Novo
            </Button>
          </menu>

          <Select
            name="techs"
            icon={FiTerminal}
            options={options}
            placeholder="Tecnologias"
            onChange={handleSelect}
            isMulti
          />
        </Form>
      </Header>
      <main>
        {candidatesFiltered.map((candidateFiltered) => (
          <CandidateItens key={candidateFiltered.id}>
            <header>
              <strong>{candidateFiltered.name}</strong>
              <div>
                {candidateFiltered.techs.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </header>
            <section>
              <p>
                <FiMail size={20} />
                {candidateFiltered.email}
              </p>
              <p>
                <FiCalendar size={20} />
                {candidateFiltered.age}
              </p>
              <p>
                <FiLinkedin size={20} />
                {candidateFiltered.linkedin}
              </p>
            </section>
            <footer>
              <Button
                type="button"
                onClick={() => {
                  handleDelete(candidateFiltered.id);
                }}
              >
                <div>
                  <FiTrash2 />
                </div>
                <p>Deletar</p>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  openModalEdit(candidateFiltered.id);
                }}
              >
                <div>
                  <FiEdit3 />
                </div>
                <p>Editar</p>
              </Button>
            </footer>
          </CandidateItens>
        ))}
      </main>
    </Container>
  );
};

export default Dashboard;
