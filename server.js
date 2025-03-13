const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para processar JSON e CORS
app.use(express.json());
app.use(cors());

// Caminho para o arquivo JSON
const dadosPath = path.join(__dirname, 'dados.json');

// Rota para fazer login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Lê o arquivo JSON
    fs.readFile(dadosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo de dados.' });
        }

        const dados = JSON.parse(data);
        const usuario = dados.usuarios.find(u => u.username === username && u.password === password);

        if (usuario) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
        }
    });
});

// Rota para cadastrar um novo usuário
app.post('/cadastrar', (req, res) => {
    const { username, password } = req.body;

    // Lê o arquivo JSON
    fs.readFile(dadosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo de dados.' });
        }

        const dados = JSON.parse(data);

        // Verifica se o usuário já existe
        const usuarioExistente = dados.usuarios.find(u => u.username === username);
        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: 'Usuário já existe.' });
        }

        // Adiciona o novo usuário
        dados.usuarios.push({ username, password });

        // Salva o arquivo JSON atualizado
        fs.writeFile(dadosPath, JSON.stringify(dados, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo de dados:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o arquivo de dados.' });
            }
            res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
