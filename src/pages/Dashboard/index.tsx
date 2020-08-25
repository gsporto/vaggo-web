import React, { useCallback } from 'react';
import { useCreateCandidate } from '../../hooks/CreateCandidate';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { openCreateCandidate } = useCreateCandidate();

  const open = useCallback(() => {
    openCreateCandidate();
  }, [openCreateCandidate]);

  return (
    <Button type="button" onClick={open}>
      teste
    </Button>
  );
};

export default Dashboard;
