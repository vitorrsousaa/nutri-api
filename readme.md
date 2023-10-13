## 💰 About Event check

This is a Resfull API built in the JavaScript language using NodeJS technology and postgresSQL database.

We use Eslint, Prettier, editorconfig and default StyleGuide integrations as an automatic code formatter. Please, download the plugins in your editor.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
1. [Prettier](https://github.com/prettier/prettier-vscode)
1. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> For make sure Prettier formats on save. Insert `"editor.formatOnSave": true` into your User Settings if you use VSCode.

## 🛠️ Technologies

Technologies and tools used in this project.

#### **API** ( [NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/) )

- [Express](https://expressjs.com/pt-br/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Prisma](https://www.prisma.io/)
- [Postgres SQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Zod](https://zod.dev/)

#### **Utilities**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)** → Extensions: **[Prettier](https://prettier.io/)** + **[EditorConfig](https://editorconfig.org/)**
- Versioning: **[Git](https://git-scm.com)**
- code Standardization: **[ESLint](https://eslint.org/)**

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: <br />
→ [Git](https://git-scm.com);<br />
→ [Node.js](https://nodejs.org/en/);<br />
→ [Docker](https://www.docker.com/); <br />

## 🎲 Starting the API

### Cloning the project

```bash
# Clone este repositório
$ git clone https://github.com/yourFinanceApp/api.git

# Vá para a pasta da aplicação Back end
$ cd api

# Instale as dependências
$ yarn install
```

### Create container

After installation of dependencies, its necessary to create a docker container. You can run in any port, but in this example, we will create a container in port 5434.

```
docker run --name server_nutri -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

### Configuration Prisma

After that, add in the root folder a file `.env`, like `.env.example` in this repository.

You can refer the Prisma documentation for more examples to configuration environment variables.

**[Prisma Docs](https://www.prisma.io/docs/guides/development-environment/environment-variables)**

Right after, you can run migrations in the DB.

```bash
# Created all of migrations and seed
$ yarn migrations
```

### Starting the project

```bash
# Starting the project
$ yarn dev

# You should receive a "Server in running on port: 3001!" on your terminal
```

### Conventional commits

feat – a new feature is introduced with the changes
fix – a bug fix has occurred
chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
refactor – refactored code that neither fixes a bug nor adds a feature
docs – updates to documentation such as a the README or other markdown files
style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
test – including new or correcting previous tests
perf – performance improvements
ci – continuous integration related
build – changes that affect the build system or external dependencies
revert – reverts a previous commit
