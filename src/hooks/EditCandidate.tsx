import React, { createContext, useContext, useCallback, useState } from 'react';

import ModalEditCandidate from '../components/ModalEditCandidate';

interface EditCandidateContextData {
  openEditCandidate(id: string): void;
  closeEditCandidate(): void;
  isOpenEditCandidate: boolean;
}

const EditCandidateContext = createContext<EditCandidateContextData>(
  {} as EditCandidateContextData,
);

export const EditCandidateProvider: React.FC = ({ children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [candidateId, setCandidateId] = useState<string>('');

  const openEditCandidate = useCallback(
    (id: string) => {
      setCandidateId(id);
      setModalOpen(true);
    },
    [setModalOpen],
  );

  const closeEditCandidate = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
    setCandidateId('');
  }, [modalOpen]);

  return (
    <EditCandidateContext.Provider
      value={{
        openEditCandidate,
        closeEditCandidate,
        isOpenEditCandidate: modalOpen,
      }}
    >
      {children}
      {candidateId && (
        <ModalEditCandidate
          id={candidateId}
          isOpen={modalOpen}
          setIsOpen={toggleModal}
        />
      )}
    </EditCandidateContext.Provider>
  );
};

export function useEditCandidate(): EditCandidateContextData {
  const context = useContext(EditCandidateContext);

  if (!context) {
    throw new Error(
      'useEditCandidate must be uses whithin a EditCandidateProvider',
    );
  }

  return context;
}
