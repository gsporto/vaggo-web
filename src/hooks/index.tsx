import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CreateCandidateProvider } from './CreateCandidate';
import { EditCandidateProvider } from './EditCandidate';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <CreateCandidateProvider>
          <EditCandidateProvider>{children}</EditCandidateProvider>
        </CreateCandidateProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
