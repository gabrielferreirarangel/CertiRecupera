import { useState } from 'react';
import api from '../services/api.js';
import useVencimentos from '../hooks/useVencimentos.js';
import { Link } from 'react-router-dom';

export default function Listagem() {

  const { vencimentos, loading, carregar } = useVencimentos();
  
  const [processando, setProcessando] = useState(false);

  const processar = async () => {
    setProcessando(true);
    try {
      const res = await api.post('/vencimentos/importar');
      alert(`${res.data.resultado.inseridos} inseridos`);
      carregar();
    } catch (err) {
      alert('Erro ao processar');
    }
    setProcessando(false);
  };

  const avisar = async (id) => {
    try {
      await api.post(`/vencimentos/${id}/notificar`);
      alert('Enviado');
    } catch (err) {
      alert('Erro');
    }
  };

  return (
    <div>
      <h2>Vencimentos</h2>
      <button onClick={processar} disabled={processando || loading}>
        {processando ? 'Processando...' : 'Processar'}
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : vencimentos.length === 0 ? (
        <p>Nenhum dado</p>
      ) : (
        <table border="5">
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
                  {}<Link to={`/cliente/${vencimento.clienteId?._id}`}>
                    <button>Detalhes</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}