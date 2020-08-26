import React, { createContext, useContext, useCallback, useState } from 'react';

import ModalCreateCandidate from '../components/ModalCreateCandidate';

interface CreateCandidateContextData {
  openCreateCandidate(): void;
  closeCreateCandidate(): void;
  isOpenCreateCandidate: boolean;
}

const CreateCandidateContext = createContext<CreateCandidateContextData>(
  {} as CreateCandidateContextData,
);

export const CreateCandidateProvider: React.FC = ({ children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openCreateCandidate = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const closeCreateCandidate = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  return (
    <CreateCandidateContext.Provider
      value={{
        openCreateCandidate,
        closeCreateCandidate,
        isOpenCreateCandidate: modalOpen,
      }}
    >
      {children}
      <ModalCreateCandidate isOpen={modalOpen} setIsOpen={toggleModal} />
    </CreateCandidateContext.Provider>
  );
};

export function useCreateCandidate(): CreateCandidateContextData {
  const context = useContext(CreateCandidateContext);

  if (!context) {
    throw new Error(
      'useCreateCandidate must be uses whithin a CreateCandidateProvider',
    );
  }

  return context;
}
