nomeUsuario();
function nomeUsuario(){
// let nomeUsuarioFornecido = prompt('Selecione um nome de usuário!');
let nomeUsuarioFornecido = 'Julio';
// pedir o nome de usuário para o cliente
// transformar o nome de usuário em objeto, para poder ser comparado no servidor

let nomeUsuario = {name:nomeUsuarioFornecido};
// enviar o nome de usuário forcido para o servidor para ver se ele é válido ou não
let usuarios = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeUsuario);
//criar duas situaçòes, uma para nome válido, e outra para nome inválido
usuarios.then(nomeValido);
usuarios.catch(nomeInvalido);
}
function nomeInvalido(){
    alert('Nome inválido! Favor selecionar um nome diferente');
    nomeUsuario();
}
function nomeValido(){
    alert('bem-vindo ao chat');
    logMensagens();
}

function logMensagens(){
    let mensagensAnterior = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagensAnterior.then(gerarMensagens);
}
function gerarMensagens(resposta){
console.log(resposta.data);
console.log(resposta.data[1]);

for(let ii=0; ii<resposta.data.length;ii++){
    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML +=` <span>${resposta.data[ii].text}<span>`
    console.log(conteudo);
}
}

function enviarMensagem(){
    let mensagemDigitada = document.getElementById("mensagem").value;
    console.log(mensagemDigitada);
    if(mensagemDigitada!==null){
        let conteudo = document.querySelector(".conteudo");
        conteudo.innerHTML +=` <span>${mensagemDigitada}<span>`
        console.log(conteudo);
    }

}