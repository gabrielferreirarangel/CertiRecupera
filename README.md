# CertiRecupera

Aplicação Single Page (SPA) em React que simula um sistema de recuperação/gestão de contatos com vencimentos — foco em exibir vencimentos, detalhes de clientes e ações de notificação. Projeto desenvolvido para a disciplina Construção de Páginas Web IV (CPW4 / IFMS).

---

## Sumário
- Descrição
- Funcionalidades
- Tecnologias
- Pré-requisitos
- Instalação e execução
- Estrutura de pastas
- Endpoints usados
- Fluxo da aplicação
- Decisões técnicas
- Testes e uso
- Melhorias e trabalhos futuros
- Contato

---

## Descrição
CertiRecupera é uma SPA modular construída com React + Vite que consome uma API para listar vencimentos, permitir processamento de importação e notificar clientes. A interface é responsiva e contempla estados de carregamento, erro e lista vazia.

---

## Funcionalidades implementadas
- Dashboard / Home (visão geral).
- Listagem de vencimentos com:
  - Exibição em tabela.
  - Estado de carregamento (`loading`) e mensagem para lista vazia.
  - Ação "Processar" que dispara importação (POST /vencimentos/importar).
  - Ação "Avisar" que notifica um vencimento (POST /vencimentos/:id/notificar).
  - Acesso à página de detalhes de cliente.
- Página de Detalhes de Cliente (`/cliente/:id`) com rota dinâmica.
- Context API (`VencimentosProvider`) para estado global dos vencimentos.
- Consumo de API centralizado em `src/services/api.js` (axios).
- CSS responsivo com suporte a prefers-color-scheme (modo escuro automático).
- Estrutura modular com `src/pages`, `src/context`, `src/services`, `src/hooks`, `src/components` (componentes reutilizáveis).

---

## Tecnologias
- React
- Vite
- React Router
- Axios
- CSS (variáveis CSS e media queries)
- ESLint (configurações presentes no repositório)
- Node.js / npm

---

## Pré-requisitos
- Node.js (>= 18 recomendado)
- npm ou yarn
- Backend API disponível em `http://localhost:3000` (ou apontar para outro endereço via variável de ambiente)

---

## Instalação e execução

1. Clonar o repositório:
   git clone https://github.com/gabrielferreirarangel/CertRecupera.git

2. Entrar na pasta do projeto:
   cd CertiRecupera

3. Instalar dependências:
   npm install

4. Rodar em modo de desenvolvimento:
   npm run dev

5. Build para produção:
   npm run build

6. Preview do build:
   npm run preview

Observação: por padrão `src/services/api.js` contém:
```js
const api = axios.create({
  baseURL: 'http://localhost:3000'
});
```
Para apontar para outra URL (ex.: deploy do backend), recomendo usar variável de ambiente do Vite (ex.: `VITE_API_BASE_URL`) e alterar `api.js` para:
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
});
```
Criar arquivo `.env` com:
```
VITE_API_BASE_URL=https://minha-api.example.com
```

---

## Estrutura de pastas (resumo)
src/
- components/        -> componentes reutilizáveis (Button, Table, Loading, Toast, Card, etc.)
- pages/             -> páginas da aplicação (Home.jsx, Listagem.jsx, Detalhes.jsx, etc.)
- context/           -> providers (VencimentosProvider.jsx)
- hooks/             -> hooks customizados (ex.: useVencimentos.js, useLocalStorage.js)
- services/          -> cliente HTTP (api.js)
- assets/            -> imagens e recursos estáticos
- index.css, App.css  -> estilos globais e específicos

---

## Endpoints consumidos (API)
Base (exemplo): `http://localhost:3000`

- GET /vencimentos
  - Retorna lista de vencimentos (cada item contém clienteId, dataVencimento, modelo, etc.)
- POST /vencimentos/importar
  - Inicia importação/processamento de vencimentos
- POST /vencimentos/:id/notificar
  - Envia notificação / aviso para o vencimento id
- GET /clientes/:id
  - Retorna dados do cliente (nomeRazaoSocial, cpfCnpj, numeroCorreto, etc.)

Formato esperado (exemplo):
- Vencimento:
```json
{
  "_id": "abc123",
  "clienteId": {
    "_id": "cliente123",
    "nomeRazaoSocial": "Empresa X",
    "cpfCnpj": "00.000.000/0001-00",
    "numeroCorreto": "+55 99 99999-9999"
  },
  "modelo": "Certificado A",
  "dataVencimento": "2026-05-01T00:00:00.000Z"
}
```

---

## Fluxo da aplicação
1. `VencimentosProvider` é carregado no topo (envolve o App) e busca `/vencimentos`.
2. `Listagem.jsx` consome o contexto (ou `useVencimentos`) e exibe a tabela.
3. Usuário pode:
   - Clicar em "Processar" → dispara `POST /vencimentos/importar` → atualiza lista.
   - Clicar em "Avisar" → dispara `POST /vencimentos/:id/notificar`.
   - Clicar em "Detalhes" → navega para `/cliente/:id` e `Detalhes.jsx` faz `GET /clientes/:id`.
4. Estados visuais: carregamento, vazio e tratamento básico de erro (alerts).

---

## Decisões técnicas e justificativas
- React + Vite: setup moderno e rápido para desenvolvimento.
- Context API: necessário para compartilhar a lista de vencimentos e funções de recarregar em várias páginas.
- Axios centralizado: facilita troca de baseURL e interceptors (auth, tratamento de erros).
- Hooks customizados: `useVencimentos` (consome contexto e encapsula lógica) e potencial `useLocalStorage` para persistir preferências (ex.: toggle dark mode).
- CSS com variáveis: facilita suporte a tema e ajuste de cores; `prefers-color-scheme` fornece dark mode automático.
- Componentização: criar componentes genéricos reduz duplicação e facilita testes.

---

## Observações sobre UX e acessibilidade
- Estados de foco têm outline (melhorar contraste).
- Notificações atualmente usam `alert()` em alguns pontos — sugerido substituir por componente Toast/Alert para melhor UX não bloqueante.
- Tabela usa `border` direto; recomenda-se estilizar via classes e tornar responsiva (scroll horizontal em telas pequenas ou cards alternativos).

---

## Trabalhos futuros / Melhorias (diferenciais)
- Implementar barra de busca/filtro na Listagem.
- Paginação (servidor ou cliente) para grandes volumes.
- Sistema de favoritos (nova rota/página).
- Toggle explícito de Dark Mode com persistência (useLocalStorage).
- Reposição de alert() por Toasts não bloqueantes.
- Validações e mensagens de erro detalhadas.
- Testes unitários e E2E.
- Documentação técnica mais aprofundada (diagrama de componentes, sequência).

---

## Como contribuir
- Fazer fork e abrir PR com branch descritiva.
- Rodar `npm install` e `npm run dev` para desenvolvimento.
- Antes de PR: rodar linter e adicionar testes quando possível.

---

## Contato
Gabriel Ferreira Rangel — repositório: `gabrielferreirarangel/CertRecupera`

---

Obrigado — se quiser, eu:
- faço o commit direto (PR) com este README.md;
- atualizo `src/services/api.js` para suportar `VITE_API_BASE_URL`;
- substituo os `alert()` por um componente Toast e envio o diff.  
Me diga qual das opções prefere que eu aplique primeiro.