import { useState, useEffect } from 'react';
import api from '../services/api.js';

export default function Listagem() {
  const [vencimentos, setVencimentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregar = async () => {
    setLoading(true);
    try {
      const res = await api.get('/vencimentos');
      setVencimentos(res.data);
    } catch (err) {
      alert('Erro ao carregar');
    }
    setLoading(false);
  };

  const processar = async () => {
    setLoading(true);
    try {
      const res = await api.post('/vencimentos/importar');
      alert(`${res.data.resultado.inseridos} inseridos`);
      carregar();
    } catch (err) {
      alert('Erro ao processar');
    }
    setLoading(false);
  };

  const avisar = async (id) => {
    try {
      await api.post(`/vencimentos/${id}/notificar`);
      alert('Enviado');
    } catch (err) {
      alert('Erro');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Vencimentos</h2>
      <button onClick={processar} disabled={loading}>
        {loading ? 'Processando...' : 'Processar'}
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : vencimentos.length === 0 ? (
        <p>Nenhum dado</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Modelo</th>
              <th>Vencimento</th>
              <th>Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {vencimentos.map((vencimento) => (
              <tr key={vencimento._id}>
                <td>{vencimento.clienteId?.nomeRazaoSocial}</td>
                <td>{vencimento.modelo}</td>
                <td>{new Date(vencimento.dataVencimento).toLocaleDateString('pt-BR')}</td>
                <td>{vencimento.clienteId?.numeroCorreto}</td>
                <td>
                  <button onClick={() => avisar(vencimento._id)}>Avisar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}