# API-Lemobs

API implementada com NodeJS, Express, PostgreSQL e Swagger

Etapas :

* Baixe o repositório, e abra- o em seguida.
* Instale as dependências com "npm install" ou "npm i"
* Execute scriptBanco.sql com o comando "psql -f scriptBanco.sql" no terminal, para criar  banco de dados, tabelas e inserir alguns dados nas mesmas. (OBS : por padrão, caso exista um banco chamado bancolemobs, este será apagado após o dado comando)

* Alterar usuário e senha do postgres nos arquivos queries.js e secret.js respectivamente.

* Execute a API com "npm start"
* Vá até local http://localhost:3000/api-docs/ no browser
* Utlize a API !

* http://localhost:3000/swagger.json -> especificações swagger

* /escola/alunos/{id} -> Retornar os dados de um aluno por id 
* /escola/informacoes -> Retornar as informações gerais
* /escola/cadastrarAluno -> Cadastrar um novo aluno


Api no Heroku ( plataforma em nuvem):

* Acessar : https://api-lemobs.herokuapp.com/api-docs/
* Inserir a url : https://api-lemobs.herokuapp.com/swagger.json e em seguida, clicar no botão "Explore"

Github : https://github.com/Igorbrito77/API-Lemobs
