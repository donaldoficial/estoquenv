const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const dadosPath = path.join(__dirname, 'dados.json');

// Função para ler o arquivo JSON
function readData() {
    const data = fs.readFileSync(dadosPath, 'utf8');
    return JSON.parse(data);
}

// Função para escrever no arquivo JSON
function writeData(data) {
    fs.writeFileSync(dadosPath, JSON.stringify(data, null, 2));
}

// Rota para fazer login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const dados = readData();
        const usuario = dados.usuarios.find(u => u.username === username && u.password === password);

        if (usuario) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar o login.' });
    }
});

// Rota para cadastrar um novo usuário
app.post('/cadastrar', (req, res) => {
    const { username, password } = req.body;

    try {
        const dados = readData();

        const usuarioExistente = dados.usuarios.find(u => u.username === username);
        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: 'Usuário já existe.' });
        }

        dados.usuarios.push({ username, password });
        writeData(dados);

        res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
