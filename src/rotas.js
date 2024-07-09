const express = require('express');
const router = express.Router();
const db = require('../db/bancoDeDados');

// CREATE: Adicionar uma nova tarefa
router.post('/', (req, res) => {
    const { titulo, descricao, status } = req.body;
    const sql = 'INSERT INTO tarefas (titulo, descricao, status) VALUES (?, ?, ?)';
    const params = [titulo, descricao, status];
    db.run(sql, params, function(erro) {
        if (erro) {
            res.status(400).json({ erro: erro.message });
            return;
        }
        res.json({
            mensagem: 'Nova tarefa criada!',
            dados: { id: this.lastID, titulo, descricao, status }
        });
    });
});

// READ: Listar todas as tarefas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tarefas';
    db.all(sql, [], (erro, linhas) => {
        if (erro) {
            res.status(400).json({ erro: erro.message });
            return;
        }
        res.json({
            mensagem: 'Lista de tarefas',
            dados: linhas
        });
    });
});

// READ: Obter uma tarefa específica
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tarefas WHERE id = ?';
    const params = [id];
    db.get(sql, params, (erro, linha) => {
        if (erro) {
            res.status(400).json({ erro: erro.message });
            return;
        }
        res.json({
            mensagem: 'Tarefa encontrada',
            dados: linha
        });
    });
});

// UPDATE: Atualizar uma tarefa existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    const sql = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
    const params = [titulo, descricao, status, id];
    db.run(sql, params, function(erro) {
        if (erro) {
            res.status(400).json({ erro: erro.message });
            return;
        }
        res.json({
            mensagem: 'Tarefa atualizada!',
            dados: { id, titulo, descricao, status }
        });
    });
});

// DELETE: Deletar uma tarefa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    const params = [id];
    db.run(sql, params, function(erro) {
        if (erro) {
            res.status(400).json({ erro: erro.message });
            return;
        }
        res.json({
            mensagem: 'Tarefa deletada!',
            dados: this.changes
        });
    });
});

module.exports = router;
