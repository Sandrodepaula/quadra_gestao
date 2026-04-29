// Aqui é o ponto de entrada da aplicação. Ele é responsável por configurar o servidor, 
// conectar ao banco de dados e iniciar a aplicação. Ele importa o app, que é onde as rotas 
// e middlewares estão configurados, e o pool de conexões do banco de dados para garantir que a 
// aplicação só inicie após uma conexão bem-sucedida com o banco.

const app = require("./src/app");
const { pool } = require("./src/config/database");

const port = 3000;

pool.connect()
  .then(() => {
    console.log("Banco conectado.");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
    process.exit(1);// Encerra a aplicação se não conseguir conectar ao banco
  });
