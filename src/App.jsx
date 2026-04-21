import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Home from './pages/Home.jsx';
import Listagem from './pages/Listagem.jsx';
import Detalhes from './pages/Detalhes.jsx';


import VencimentosProvider from './context/VencimentosProvider.jsx';

function App() {
  return (
    
    <VencimentosProvider>
      <BrowserRouter>
        
        
        <nav style={{ padding: '1rem', background: '#333', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
          <Link to="/vencimentos" style={{ color: 'white', textDecoration: 'none' }}>📋 Vencimentos</Link>
        </nav>

        
        <Routes>
          
          <Route path="/" element={<Home />} /> 
          <Route path="/vencimentos" element={<Listagem />} />
          <Route path="/cliente/:id" element={<Detalhes />} />
        </Routes>

      </BrowserRouter>
    </VencimentosProvider>
  );
}

export default App;