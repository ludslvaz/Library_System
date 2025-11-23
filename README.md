<h1 align="center">📚 LudLibrary - Sistema de Gerenciamento de Biblioteca</h1>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Status-Concluído-green?style=for-the-badge" />
</p>

<p align="center">
   Uma aplicação web completa para gerenciamento de leituras, reservas e catálogo de livros, construída com <strong> JavaScript</strong> (sem frameworks).
</p>

---

## 🖥️ Sobre o Projeto

O **LudLibrary** é uma Single Page Application (SPA) simulada, desenvolvida para praticar conceitos fundamentais de desenvolvimento web. <br>O sistema permite que usuários se cadastrem, naveguem por um catálogo de livros, gerenciem sua própria lista de leitura e façam reservas com prazos definidos.

O diferencial deste projeto é o uso de **LocalStorage** para persistência de dados, funcionando como um banco de dados no navegador, além de uma arquitetura organizada em MVC simplificado.

---

## ⚙️ Funcionalidades

### 👤 Usuário Comum
- [x] **Autenticação:** Sistema de Login e Cadastro com validação via Regex (E-mail e Senha forte).
- [x] **Catálogo:** Visualização de livros disponíveis com capas e detalhes.
- [x] **Minha Lista (CRUD):**
  - Adicionar livros à lista pessoal.
  - Marcar como "Lido" ou "Para Ler".
  - Remover livros da lista.
- [x] **Reservas:** Sistema de reserva com cálculo automático de data de expiração (3 dias).
- [x] **Persistência:** Todos os dados (sessão, lista, reservas) salvos no navegador.

### 🛠️ Administração (Gerenciamento)
- [x] **Cadastro de Livros:** Formulário para adicionar novos títulos ao catálogo global.
- [x] **Edição:** Possibilidade de alterar dados de livros existentes.
- [x] **Exclusão:** Remover livros do sistema.

---

## 🎨 Layout e Responsividade

- Uso de **CSS Grid** e **Flexbox** para layouts fluidos.
- Menu de navegação responsivo.
- Variáveis CSS para fácil manutenção do tema de cores.
- Feedback visual (hover, focus e validações de formulário).

---

## 🚀 Como Rodar o Projeto

Como este projeto utiliza apenas tecnologias nativas (HTML, CSS e JS), não é necessário instalar dependências (npm/yarn).

### Pré-requisitos
- Um navegador web moderno (Chrome, Firefox, Edge).
- Um editor de código (VS Code) - *Opcional*.

### Passo a Passo
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/ludslvaz/Library_System.git](https://github.com/ludslvaz/Library_System.git)
