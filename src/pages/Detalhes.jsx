import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';

const Detalhes = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const res = await api.get(`/clientes/${id}`);
        setCliente(res.data);
      } catch (err) {
        console.error("Erro ao buscar cliente");
      }
    };
    buscarCliente();
  }, [id]);

  if (!cliente) return <p>Carregando detalhes...</p>;

  return (
    <div>
      <Link to="/vencimentos">⬅️ Voltar para a lista</Link>
      <h1>Detalhes do Cliente</h1>
      <div>
        <p><strong>Nome:</strong> {cliente.nomeRazaoSocial}</p>
        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
        <p><strong>Telefone no Banco:</strong> {cliente.numeroCorreto}</p>
      </div>
    </div>
  );
};

export default Detalhes;