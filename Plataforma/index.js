function entrar() {
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');
  
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  let msgError = document.querySelector('#msgError');
  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  
  let userValid = {
    nome: null,
    idade:null,
    genero:null,
    user: null,
    tel:null,
    senha: null
  };
  
  let userFound = false;

  listaUser.forEach((item) => {
    if (usuario.value === item.userCad && senha.value === item.senhaCad ) {
      userValid = {
        nome: item.nomeCad,
        idade:item.idadeCad,
        genero:item.generoCad,
        user: item.userCad,
        tel: item.telCad,
        senha: item.senhaCad

      };
      userFound = true;
    }
  });

  if (userFound) {
    window.location.href = '/home.html';
    
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(userValid));
  } else {
    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'color: red; display: block;');
    msgError.innerHTML = 'Email ou senha incorretos';
    usuario.focus();
  }
}
