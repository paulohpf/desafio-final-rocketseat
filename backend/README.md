<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://raw.githubusercontent.com/paulohpf/desafio-final-rocketseat/master/images/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 3: Gympoint, continuando a aplicação
</h3>

<p align="center">
  <a href="#banco-de-dados">Banco de dados</a> | <a href="#execução">Execução</a>
</p>

## Banco de dados

O Banco de dados utilizado é o Postgres e o Redis, para envio de email eu utilizei o Mailtrap.

Para instalar o Banco de dados, utilizei o Docker, por isso baixe e instale a última versão de acordo com o seu sistema operacional em <a href="https://hub.docker.com">Docker Hub</a>.

Após configurado o banco de dados preencha o .env utilizando o exemplo .env.example

Para popular o banco utilize os comandos

`$ npx sequelize migrate`

`$ npx sequelize db:seed:all`

## Execução

Para executar o Backend abra dois prompts de comando e execute os seguintes comandos:

`$ npm start`

`$ npm run queue`
