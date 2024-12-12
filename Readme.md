# 🌐 Digital Store - Backend

API RESTful desenvolvida para gerenciar usuários, categorias e produtos em um ambiente seguro e escalável. Utilizando **Node.js** com **Express.js** para o backend, a aplicação implementa **CRUD** completo para cada entidade, além de **autenticação e autorização** com **JWT**. O banco de dados **MySQL** é gerenciado pelo **Sequelize**, garantindo uma interação eficiente e simplificada. A aplicação é **containerizada com Docker**, proporcionando facilidade de configuração, portabilidade e padronização do ambiente, permitindo uma implantação mais ágil e consistente. 🚀

---

### 🚀 Passo 1: Criar o arquivo `.env`

1. Na raiz do projeto, você encontrará um arquivo chamado `.env.example`. Faça uma cópia deste arquivo e renomeie-a para `.env`.

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com as variáveis apropriadas.

### 📦 Passo 3: Instalar Dependências
```bash
npm i
```

### 🔄 Passo 4: Compilar código TypeScript em JavaScript
```bash
npm run build
```

### 🐳 Passo 5: Executar o Projeto com Docker
1. Iniciar o Docker Compose: No terminal, execute o comando abaixo para iniciar o Docker Compose em segundo plano, criando o container do backend e do banco de dados. Certifique-se de estar na raiz do projeto:
```bash
docker-compose up -d
```

### 🛠️ Passo 6: Criar Banco de Dados e Executar as Migrations
1. Acessar o Container do Backend: No terminal, entre no container do backend para rodar os comandos de banco de dados:
```bash
docker exec -it backend sh
```

2. Criar o Banco de Dados: Dentro do container, execute o comando abaixo para criar o banco de dados:
```bash
npx sequelize db:create
```

3. Rodar as Migrations: Após a criação do banco de dados, execute as migrations para criar as tabelas necessárias:
```bash
npx sequelize db:migrate
```

### 🧪 Executando Testes Automatizados

Certifique-se de estar na raiz do projeto, e execute o seguinte comando:

```bash
npm test
```

### 💻 Testes Manuais

Para facilitar o teste das rotas da API, você pode importar um arquivo JSON contendo as rotas no **Insomnia** ou **Postman**.

1. **Baixe o arquivo contendo as rotas**:
   - Navegue até a pasta `docs` na raiz do projeto.
   - Dentro dessa pasta, se encontra o arquivo `api-routes.json`. Este arquivo contém as rotas configuradas da API que você pode importar para testar em ferramentas como Insomnia ou Postman.
   - Faça o download ou copie o arquivo `api-routes.json` para o seu computador.

2. **No Insomnia**:
   - Abra o Insomnia.
   - Clique em **"Import"** no canto superior esquerdo.
   - Selecione **"From File"** e escolha o arquivo JSON com as rotas.

3. **No Postman**:
   - Abra o Postman.
   - Clique em **"Import"** no canto superior esquerdo.
   - Selecione **"File"** e escolha o arquivo JSON com as rotas.

Isso irá importar todas as rotas configuradas no arquivo JSON, facilitando os testes da API.
