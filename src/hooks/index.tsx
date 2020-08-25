import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CreateCandidateProvider } from './CreateCandidate';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <CreateCandidateProvider>{children}</CreateCandidateProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
