document.addEventListener("DOMContentLoaded", function() {
    const redefinirSenhaBtn = document.querySelector("#redefinirSenha");
    if (redefinirSenhaBtn) {
        redefinirSenhaBtn.addEventListener("click", redefinirSenha);
    }
});

function redefinirSenha() {
   
    removeErrorMessages();

    let tempSenha = document.querySelector('#tempSenha').value;
    let newSenha = document.querySelector('#newSenha').value;
    let confirmSenha = document.querySelector('#confirmSenha').value;

   
    if (tempSenha.length !== 6 || isNaN(tempSenha)) {
        displayError("O código de verificação deve ter 6 dígitos.", "#tempSenha");
        return;
    }

   
    let codigoVerificacao = localStorage.getItem('codigoVerificacao');
    if (tempSenha !== codigoVerificacao) {
        displayError("O código de verificação inserido está incorreto.", "#tempSenha");
        return;
    }

    if (newSenha.length < 6) {
        displayError("A nova senha deve ter pelo menos 6 caracteres.", "#newSenha");
        return;
    }

    if (newSenha !== confirmSenha) {
        displayError("As senhas não coincidem.", "#confirmSenha");
        return;
    }

    
    let emailRedefinicao = localStorage.getItem('emailRedefinicao');
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    listaUser.forEach((item, index) => {
        if (item.userCad === emailRedefinicao) {
            listaUser[index].senhaCad = newSenha;
        }
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    // Se todas as validações passarem, a senha será redefinida
    alert("Senha redefinida com sucesso!");
    window.location.href = '/index.html';
}

function displayError(message, elementId) {
    let errorMsg = document.createElement('div');
    errorMsg.textContent = message;
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "14px";
    errorMsg.id = "error-" + elementId.substring(1); 
    
    let element = document.querySelector(elementId);
    element.parentElement.insertBefore(errorMsg, element.nextSibling);
}

function removeErrorMessages() {
    // Seleciona todas as mensagens de erro e as remove
    let errorMessages = document.querySelectorAll("[id^='error-']");
    errorMessages.forEach(errorMsg => errorMsg.remove());
}
