const express = require('express');
const app = express();
const porta = 3000;
const rotas = require('./rotas');

app.use(express.json());
app.use('/tarefas', rotas);

app.listen(porta, () => {
    console.log(`Servidor está rodando em http://localhost:${porta}`);
});
