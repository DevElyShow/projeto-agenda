# 📔 Projeto Agenda - Node.js & MongoDB

Bem-vindo ao **Projeto Agenda**! Esta é uma aplicação completa (Full-Stack) desenvolvida para gerenciar contatos de forma segura e eficiente. O projeto foi construído focando em boas práticas de programação, organização de código e segurança.

## 🚀 Demonstração
Você pode testar a aplicação online aqui: [https://projeto-agenda-amber.vercel.app/](https://projeto-agenda-amber.vercel.app/)

---

## 🏗️ Estrutura do Projeto (Padrão MVC)

O projeto foi organizado utilizando o padrão **Model-View-Controller**, garantindo que cada parte do código tenha uma responsabilidade clara:

- **Models:** Gerenciam os dados e as regras de negócio (integração com MongoDB e validações).
- **Views:** Interface do usuário construída com **EJS**, permitindo páginas dinâmicas.
- **Controllers:** Os diretores do sistema, que conectam as Views aos Models e gerenciam as rotas.
- **Middlewares:** Camadas de segurança que protegem as rotas e gerenciam mensagens de erro/sucesso.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** e **Express**: Motor e framework do servidor.
- **MongoDB** (via Mongoose): Banco de Dados NoSQL para armazenamento dos contatos e usuários.
- **EJS (Embedded JavaScript)**: Motor de renderização de templates HTML.
- **Bcryptjs**: Criptografia de senhas para segurança máxima dos usuários.
- **CSURF & Helmet**: Proteção contra ataques web (CSRF e cabeçalhos de segurança).
- **Connect-flash**: Mensagens de feedback em tempo real para o usuário.
- **API ViaCEP**: Integração inteligente para busca automática de endereços.

---

## 🌟 Principais Funcionalidades

- ✅ **Sistema de Usuários:** Cadastro e login com sessões seguras.
- ✅ **CRUD de Contatos:** Criar, visualizar, editar e apagar contatos.
- ✅ **Segurança:** Acesso às páginas de contatos restrito apenas a usuários logados.
- ✅ **Validação Inteligente:** O sistema impede e-mails inválidos, senhas curtas ou campos obrigatórios vazios.
- ✅ **Interface Responsiva:** Design limpo e fácil de usar.

---

## ⚙️ Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/DevElyShow/projeto-agenda.git](https://github.com/DevElyShow/projeto-agenda.git)
Instale as dependências:

Bash
npm install
Crie um arquivo .env na raiz e adicione sua string de conexão do MongoDB:

Snippet de código
CONNECTIONSTRING=sua_uri_do_mongodb
Inicie o servidor:

Bash
npm start
Acesse no navegador: http://localhost:3000

👨‍💻 Desenvolvido por Elydeivison Cesar.
Focado em aprender cada vez mais sobre o ecossistema JavaScript!
