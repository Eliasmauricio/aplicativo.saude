document.addEventListener("DOMContentLoaded", function() {
document.querySelector("#redefinir").addEventListener("click", redefinir);
});

function redefinir() {
    let usuario = document.querySelector('#usuario');
    let userLabel = document.querySelector('#labelUsuario');
    let msgError = document.querySelector('#msgError');

    let emailValido = validarEmail(usuario.value);

    if (!emailValido) {
        userLabel.setAttribute('style', 'color: red');
        usuario.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'color: red; display: block;');
        msgError.innerHTML = 'Por favor, insira um e-mail válido.';
        usuario.focus();
        return;
    }

    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    let emailEncontrado = listaUser.some(item => item.userCad === usuario.value);

    if (emailEncontrado) {
        // Gerar número aleatório
        let codigoVerificacao = Math.floor(100000 + Math.random() * 900000);
        alert("Seu código de verificação é: " + codigoVerificacao);

        // Salvar o código de verificação e o email no localStorage
        localStorage.setItem('codigoVerificacao', codigoVerificacao);
        localStorage.setItem('emailRedefinicao', usuario.value);

        // Redirecionar para a página de redefinição de senha
        window.location.href = '/senha.html';
    } else {
        userLabel.setAttribute('style', 'color: red');
        usuario.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'color: red; display: block;');
        msgError.innerHTML = 'Email não encontrado';
        usuario.focus();
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
