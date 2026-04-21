import { useContext } from 'react';
import { VencimentosContext } from '../context/VencimentosProvider.jsx';

const useVencimentos = () => {
  const context = useContext(VencimentosContext);
  
  if (!context) {
    throw new Error('useVencimentos deve ser usado dentro de um VencimentosProvider');
  }

  return context;
};

export default useVencimentos;