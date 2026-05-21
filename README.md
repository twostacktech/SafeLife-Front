# SafeLife Frontend

Interface web desenvolvida para o sistema SafeLife, uma aplicação de gestão de clientes, apólices de seguro e relatórios administrativos.

O **SafeLife Frontend** foi construído com React, TypeScript e Vite para consumir a API do SafeLife e oferecer uma experiência simples, responsiva e organizada para o gerenciamento de seguros.

---

# Sobre o projeto

A aplicação possui uma área pública institucional e uma área administrativa para consulta e manutenção dos dados do sistema.

O objetivo do projeto é facilitar a gestão de seguros de vida, permitindo cadastrar clientes, criar apólices, associar beneficiários e acompanhar informações gerais por meio de relatórios.

---

# Funcionalidades

## Página inicial

- Página institucional da SafeLife
- Seções de apresentação, benefícios, chamada para ação e dúvidas frequentes
- Navbar e footer personalizados
- Layout responsivo

## Clientes

- Cadastro de clientes
- Listagem de clientes
- Edição de clientes
- Exclusão de clientes
- Busca por CPF
- Integração com a API REST

## Apólices

- Cadastro de apólices
- Listagem de apólices
- Edição de apólices
- Exclusão de apólices
- Associação de cliente por CPF
- Cadastro de beneficiários por apólice
- Filtros por CPF, cobertura e status

## Relatórios

- Resumo de clientes cadastrados
- Resumo de apólices cadastradas
- Indicadores financeiros e de cobertura

---

# Interface

O projeto utiliza uma identidade visual voltada para seguros e proteção familiar, com:

- Paleta em vermelho, azul escuro e tons neutros
- Componentes modernos e responsivos
- Tabelas administrativas para leitura rápida
- Modais para cadastro e edição
- Feedback visual com notificações

---

# Tecnologias utilizadas

## Frontend

- React
- TypeScript
- Vite

## Estilização

- Tailwind CSS

## Bibliotecas

- React Router DOM
- Axios
- Lucide React
- Phosphor Icons
- React Toastify
- React Spinners

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/twostacktech/safelife-front.git
cd safelife-front
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

---

# Backend

O frontend consome a API do SafeLife:

```bash
https://safelife-r0dj.onrender.com
```

---

# Desenvolvido por

Projeto desenvolvido pelo grupo TwoStack durante o bootcamp Generation Brasil.
