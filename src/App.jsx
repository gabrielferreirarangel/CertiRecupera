import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 1. Importa as suas páginas
import Home from './pages/Home.jsx'; // (Se você tiver criado a Home)
import Listagem from './pages/Listagem.jsx';
import Detalhes from './pages/Detalhes.jsx';

// 2. Importa o Provedor do Contexto que criamos!
import VencimentosProvider from './context/VencimentosProvider.jsx';

function App() {
  return (
    // 3. Colocamos o Provedor em volta de TODO O SITE
    <VencimentosProvider>
      <BrowserRouter>
        
        {/* Menu de Navegação Básico */}
        <nav style={{ padding: '1rem', background: '#333', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
          <Link to="/vencimentos" style={{ color: 'white', textDecoration: 'none' }}>📋 Vencimentos</Link>
        </nav>

        {/* Configuração das Rotas */}
        <Routes>
          {/* Se a Home não existir ainda, você pode apontar o "/" direto para a Listagem */}
          <Route path="/" element={<Home />} /> 
          <Route path="/vencimentos" element={<Listagem />} />
          <Route path="/cliente/:id" element={<Detalhes />} />
        </Routes>

      </BrowserRouter>
    </VencimentosProvider>
  );
}

export default App;