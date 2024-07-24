## Como executar o projeto
Para executar o projeto, certifique-se de ter o Node.js instalado e siga as instruções abaixo:

1. Instale as dependências necessárias. No terminal, navegue até o diretório do repositório back-end e execute os seguintes comandos:
   
```bash
npm install
npm install prisma
npm install koa
```
2. Configure o banco de dados, siga estas etapas:

Crie um arquivo .env no diretório do projeto e adicione as seguintes linhas ao arquivo .env:
```bash
DATABASE_URL="url-do-seu-banco-de-dados"
```
3. Ainda no diretório do repositório back-end, execute o seguinte comando para iniciar o servidor:
```bash
node api/index.js
```
