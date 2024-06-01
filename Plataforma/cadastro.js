let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let idade = document.querySelector('#idade');
let labelIdade = document.querySelector('#labelIdade');
let validIdade = false;

let genero = document.querySelector('#genero');
let labelGenero = document.querySelector('#labelGenero');
let validGenero = false;

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let tel = document.querySelector('#tel');
let labelTel = document.querySelector('#labelTel');
let validTel = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
        nome.setAttribute('style', 'border-color: red');
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerHTML = 'Nome';
        nome.setAttribute('style', 'border-color: green');
        validNome = true;
    }
});

idade.addEventListener('keyup', () => {
    if (idade.value.length <= 1) {
        labelIdade.setAttribute('style', 'color: red');
        labelIdade.innerHTML = 'Idade *Insira no mínimo 2 caracteres';
        idade.setAttribute('style', 'border-color: red');
        validIdade = false;
    } else {
        labelIdade.setAttribute('style', 'color: green');
        labelIdade.innerHTML = 'Idade';
        idade.setAttribute('style', 'border-color: green');
        validIdade = true;
    }
});

genero.addEventListener('change', () => {
    if (genero.value === "") {
        labelGenero.setAttribute('style', 'color: red');
        labelGenero.innerHTML = 'Gênero *Selecione uma opção';
        genero.setAttribute('style', 'border-color: red');
        validGenero = false;
    } else {
        labelGenero.setAttribute('style', 'color: green');
        labelGenero.innerHTML = 'Gênero';
        genero.setAttribute('style', 'border-color: green');
        validGenero = true;
    }
});

usuario.addEventListener('keyup', () => {
    var email = usuario.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length <= 4 || !emailPattern.test(email)) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = 'Email *Insira um email válido';
        usuario.setAttribute('style', 'border-color: red');
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'color: green');
        labelUsuario.innerHTML = 'Email';
        usuario.setAttribute('style', 'border-color: green');
        validUsuario = true;
    }
});

tel.addEventListener('keyup', () => {
    if (tel.value.length <= 7) {
        labelTel.setAttribute('style', 'color: red');
        labelTel.innerHTML = 'Tel *Insira no mínimo 8 caracteres';
        tel.setAttribute('style', 'border-color: red');
        validTel = false;
    } else {
        labelTel.setAttribute('style', 'color: green');
        labelTel.innerHTML = 'Tel';
        tel.setAttribute('style', 'border-color: green');
        validTel = true;
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    }
});

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
        confirmSenha.setAttribute('style', 'border-color: red');
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green');
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        confirmSenha.setAttribute('style', 'border-color: green');
        validConfirmSenha = true;
    }
});

function cadastrar() {
    if (validNome && validIdade && validGenero && validarEmail(usuario.value) && validTel && validSenha && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        listaUser.push({
            nomeCad: nome.value,
            idadeCad: idade.value,
            generoCad: genero.value,
            userCad: usuario.value,
            telCad: tel.value,
            senhaCad: senha.value
        });

        localStorage.setItem('listaUser', JSON.stringify(listaUser));
        msgSuccess.setAttribute('style', 'display: block; color: green;');
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
        msgError.setAttribute('style', 'display: none;');
        msgError.innerHTML = '';

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);
    } else {
        msgError.setAttribute('style', 'display: block; color: red;');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
        msgSuccess.setAttribute('style', 'display: none;');
        msgSuccess.innerHTML = '';
    }
}

function validarEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return false;
    }

    return true;
}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});

btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha');

    if (inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text');
    } else {
        inputConfirmSenha.setAttribute('type', 'password');
    }
});
