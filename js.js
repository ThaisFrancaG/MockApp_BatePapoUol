let usuario = "";
let nomeUsuarioFornecido;
let nomeUsuarioObj;
let ultimaMensagem  = {};

nomeUsuario();
function nomeUsuario(){
 nomeUsuarioFornecido = prompt('Selecione um nome de usuário!');

 nomeUsuarioObj = {name:nomeUsuarioFornecido};

let usuarios = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeUsuarioObj);
usuarios.then(nomeValido);
usuarios.catch(nomeInvalido);
}

function nomeInvalido(){
    alert('Nome inválido! Favor selecionar um nome diferente');
    nomeUsuario();
}
function nomeValido(){
    alert('bem-vindo ao chat');
    usuario = nomeUsuarioFornecido;
    logMensagens();
}
//----------COFNERENCIA DE INATIVIDADE ----------

setInterval(atividade,5000);

function atividade(){
    let statusAtividade = axios.post('https://mock-api.driven.com.br/api/v4/uol/status');

    statusAtividade.then(console.log("logado"));
    // statusAtividade.catch(analiseErroLogado);
}

function analiseErroLogado(){
alert("Desculpe, mas você foi deslogado por inatividade!");
window.location.reload();
}
// -----------------------------------------------------------------------------------------------PEGAR MENSAGENS----------------------------//

setInterval(logMensagens,3000);
// logMensagens();

function logMensagens(){
    let mensagensAnterior = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagensAnterior.then(gerarMensagens);
    mensagensAnterior.catch(analiseErroMensagem);
}
function analiseErroMensagem(erro){
console.log(erro.response);
alert ("Desculpe, tivemos problemas ao carregar as mensagens! A página será atualizada");
window.location.reload();
}
let logAnterior;
let logAtual=[];

function gerarMensagens(resposta){

logAtual  = resposta.data;

let conteudo = document.querySelector(".conteudo");
        conteudo.innerHTML ="";

escreverMensagens();

}

function escreverMensagens(){
    //console.log(resposta.data);eu tenho que ver se ela ainda está sendo chamada. No caso, ela não está. Então, o logAnterior não está sendo atualizado, e a comparaçào na função anterior dá errado

for(let ii=0; ii<logAtual.length;ii++){

//aqui é só construção das mensagens
    let conteudo = document.querySelector(".conteudo");
    let tipoMensagem = logAtual[ii].type;
    let tipoDeMensagem = "";
    if (tipoMensagem == 'status'){
        tipoDeMensagem = "status";
        conteudo.innerHTML +=` <div class = "mensagem-geral ${tipoDeMensagem}"> <span class = "tempo">${logAtual[ii].time}</span>
        <span class = "from">${logAtual[ii].from}</span>
        <span class = "mensagem">${logAtual[ii].text}</span></div>`;
    }

    else{
    if (tipoMensagem == "message"){
        tipoDeMensagem = "mensagem-geral";  
    }
    else if (tipoMensagem == "private_message" && logAtual[ii].to== nomeUsuarioFornecido)
    //tem que corrigir esse condicional depois
    {
        tipoDeMensagem = "mensagem-geral privada";
    }
    else{tipoMensagem == "hidden"}
    conteudo.innerHTML +=` <div class = ${tipoDeMensagem}> <span class = "tempo">${logAtual[ii].time}</span>
    <span class = "from">${logAtual[ii].from}</span>
    <span>para</span>
    <span class = "to">${logAtual[ii].to}</span>
    <span class = "mensagem">${logAtual[ii].text}</span></div>`;
}
}
window.scrollTo(0,document.body.scrollHeight);
}

function enviarMensagem(){
    let espacoTexto = document.getElementById("mensagem");
    let mensagemDigitada = espacoTexto.value;
    if(mensagemDigitada!==null){
       //eu tenho que transformar o que foi digitado em um objeto
    
       let mensagemParaServidor = {
           from: usuario,
           to: "todos",
           text: mensagemDigitada,
           type: "message"
       }
    
       let statusEnvio = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemParaServidor);
       
statusEnvio.then(logMensagens);
statusEnvio.catch(analiseErroMensagem);
espacoTexto.value = null;




// statusEnvio.catch(window.location.reload());    
    }
}