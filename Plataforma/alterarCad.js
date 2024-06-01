document.addEventListener('DOMContentLoaded', () => {
  // Carregar as informações do usuário logado
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (!userLogado) {
    alert('Nenhum usuário logado encontrado.');
    window.location.href = '/home.html';
    return;
  }

  // Exibir as informações do usuário logado no formulário
  document.getElementById('nome').value = userLogado.nome;
  document.getElementById('idade').value = userLogado.idade;
  document.getElementById('genero').value = userLogado.genero;
  document.getElementById('usuario').value = userLogado.user;
  document.getElementById('tel').value = userLogado.tel;

  // Função para alterar as informações de cadastro e senha do usuário
  function alterarCadastro() {
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let genero = document.getElementById('genero').value;
    let usuario = document.getElementById('usuario').value;
    let tel = document.getElementById('tel').value;
    let senhaAtual = document.getElementById('senhaAtual').value;
    let novaSenha = document.getElementById('novaSenha').value;
    let confirmNovaSenha = document.getElementById('confirmNovaSenha').value;
    let msgError = document.getElementById('msgError');
    let msgSuccess = document.getElementById('msgSuccess');

    if (nome.length <= 2) {
      msgError.innerText = 'Nome deve ter no mínimo 3 caracteres.';
      msgError.style.display = 'block';
      return;
    }

    if (genero === "" ) {
      msgError.innerText = 'Selecione uma opção de Gênero.';
      msgError.style.display = 'block';
      return;
    }

    if (idade.length <= 1) {
      msgError.innerText = 'Idade deve ter no mínimo 2 dígitos.';
      msgError.style.display = 'block';
      return;
    }

    if (senhaAtual !== userLogado.senha) {
      msgError.innerText = 'Senha atual incorreta.';
      msgError.style.display = 'block';
      return;
    }

    if (tel.length <= 7) {
      msgError.innerText = 'Tel deve ter no mínimo 8 números.';
      msgError.style.display = 'block';
      return;
    }

    if (novaSenha.length <= 5) {
      msgError.innerText = 'A nova senha deve ter no mínimo 6 caracteres.';
      msgError.style.display = 'block';
      return;
    }

    if (novaSenha !== confirmNovaSenha) {
      msgError.innerText = 'A nova senha e a confirmação não coincidem.';
      msgError.style.display = 'block';
      return;
    }

    if (!isValidEmail(usuario)) {
      msgError.innerText = 'Email deve estar no formato correto (ex: aaa@aa.com).';
      msgError.style.display = 'block';
      return;
    }

    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    let userIndex = listaUser.findIndex(item => item.userCad === userLogado.user);

    if (userIndex !== -1) {
      // Atualiza as informações do usuário na lista de usuários
      listaUser[userIndex].nomeCad = nome;
      listaUser[userIndex].idadeCad = idade;
      listaUser[userIndex].generoCad = genero;
      listaUser[userIndex].userCad = usuario;
      listaUser[userIndex].telCad = tel;
      if (novaSenha) {
        listaUser[userIndex].senhaCad = novaSenha;
        userLogado.senha = novaSenha;
      }

      localStorage.setItem('listaUser', JSON.stringify(listaUser));

      // Atualiza as informações do usuário logado
      userLogado.nome = nome;
      userLogado.idade = idade;
      userLogado.genero = genero;
      userLogado.user = usuario;
      userLogado.tel = tel;
      localStorage.setItem('userLogado', JSON.stringify(userLogado));

      msgSuccess.innerText = 'Cadastro alterado com sucesso. Redirecionando...';
      msgSuccess.style.display = 'block';
      msgError.style.display = 'none';

      setTimeout(() => {
        window.location.href = '/home.html';
      }, 3000); // Redireciona após 3 segundos
    } else {
      msgError.innerText = 'Erro ao alterar o cadastro. Usuário não encontrado.';
      msgError.style.display = 'block';
    }
  }

  // Adicionar evento ao botão "Alterar Cadastro"
  document.querySelector('#btnAlterarCadastro').addEventListener('click', alterarCadastro);

  // Validar o campo de e-mail
  let usuario = document.querySelector('#usuario');
  usuario.addEventListener('keyup', () => {
    var email = usuario.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || !email.includes('.')) {
      msgError.innerText = 'Email inválido.';
      msgError.style.display = 'block';
    } else {
      msgError.style.display = 'none';
    }
  });

  // Função para validar o formato do email
  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});
