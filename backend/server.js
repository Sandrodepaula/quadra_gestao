// Aqui é o ponto de entrada da aplicação. Ele é responsável por configurar o servidor, 
// conectar ao banco de dados e iniciar a aplicação. Ele importa o app, que é onde as rotas 
// e middlewares estão configurados, e o pool de conexões do banco de dados para garantir que a 
// aplicação só inicie após uma conexão bem-sucedida com o banco.

const app = require("./src/app");


const port = 3000;


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
