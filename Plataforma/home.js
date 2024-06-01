// Obtendo o nome do usuário logado do localStorage
const userLogado = JSON.parse(localStorage.getItem('userLogado'));
// Exibindo uma mensagem de boas-vindas com o nome do usuário
document.getElementById('logado').innerHTML = `Olá, ${userLogado.nome}`;

// Adicionando evento ao botão "Conta" para redirecionar para a página de exclusão de conta
document.querySelector('#btnExcluir').addEventListener('click', function() {
    window.location.href ='/excluir.html';
});

// Função para sair da conta e redirecionar para a página de login
function sair() {
    localStorage.removeItem("userLogado");
    window.location.href = "/index.html"; // Redirecionar para a página de login
}