// Função para alternar o menu lateral
function toggleMenu() {
    const menu = document.getElementById('menu-conteudo');
    menu.classList.toggle('menu-aberto');
}

// Função para fazer login
function fazerLogin() {
    const username = document.getElementById('login-username').value;
    const senha = document.getElementById('login-password').value;

    // Recupera usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário e senha estão corretos
    const usuario = usuarios.find(u => u.username === username && u.senha === senha);
    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = 'estoque.html';
    } else {
        document.getElementById('login-message').textContent = 'Usuário ou senha incorretos!';
    }
}

// Adiciona o evento de submit ao formulário de login
document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();
    fazerLogin();
});