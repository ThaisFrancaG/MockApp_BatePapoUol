nomeUsuario();
function nomeUsuario(){
// let nomeUsuarioFornecido = prompt('Selecione um nome de usuário!');
let nomeUsuarioFornecido = 'Jfdsfs';
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
console.log(resposta.data[1].from);
console.log(resposta.data[1].to);
console.log(resposta.data[1].type);
console.log(resposta.data[1].text);
console.log(resposta.data[1].time);
//esse é o formato para que eu consiga acessar as informaçòes dentro dos objetos

for(let ii=0; ii<resposta.data.length;ii++){
    //com isso, ele vai passar por todos os objetos contidos
    let conteudo = document.querySelector(".conteudo");
    //porque é dentro do espaço de conteúdo que serão escritas as mensagens
    //as agora eu tenho 4 itens para pegar, sendo que um deles, o status, eu tenho que conferir dentro de um if para ter certeza de qual a classe correta
    let tipoMensagem = resposta.data[ii].type;
    let tipoDeMensagem = "";
    if (tipoMensagem == 'status'){
        tipoDeMensagem = "status";
        conteudo.innerHTML +=` <div class = "mensagem-geral ${tipoDeMensagem}"> <span class = "tempo">${resposta.data[ii].time}</span>
        <span class = "from">${resposta.data[ii].from}</span>
        <span class = "mensagem">${resposta.data[ii].text}</span></div>`;
    }

    else{
    if (tipoMensagem == "message"){
        tipoDeMensagem = "mensagem-geral";  
    }
    else if (tipoMensagem == "private_message"){
        tipoDeMensagem = "mensagem-geral privada";
    }
    conteudo.innerHTML +=` <div class = ${tipoDeMensagem}> <span class = "tempo">${resposta.data[ii].time}</span>
    <span class = "from">${resposta.data[ii].from}</span>
    <span>para</span>
    <span class = "to">${resposta.data[ii].to}</span>
    <span class = "mensagem">${resposta.data[ii].text}</span></div>`;
}
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