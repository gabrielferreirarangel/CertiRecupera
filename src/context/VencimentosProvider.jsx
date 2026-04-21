import { createContext, useState, useEffect } from 'react';
import api from '../services/api.js';

export const VencimentosContext = createContext();

const VencimentosProvider = ({ children }) => {
  const [vencimentos, setVencimentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregar = async () => {
    setLoading(true);
    try {
      const res = await api.get('/vencimentos');
      setVencimentos(res.data);
    } catch (err) {
      console.error('Erro ao carregar');
    }
    setLoading(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <VencimentosContext.Provider value={{ vencimentos, loading, carregar }}>
      {children}
    </VencimentosContext.Provider>
  );
};

export default VencimentosProvider;