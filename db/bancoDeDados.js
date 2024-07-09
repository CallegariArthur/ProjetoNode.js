const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tarefas.db', (erro) => {
    if (erro) {
        console.error('Erro ao abrir o banco de dados', erro.message);
    } else {
        console.log('Conexão bem sucedida com o banco de dados SQLite');
        db.run(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            status TEXT NOT NULL
        )`);
    }
});

module.exports = db;
