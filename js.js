let usuario = "";
let nomeUsuarioFornecido;
let nomeUsuarioObj;

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
    let statusAtividade = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nomeUsuarioObj);

    // statusAtividade.then(console.log("logado"));
    // statusAtividade.catch(console.log("ops"));
}
// -----------------------------------------------------------------------------------------------PEGAR MENSAGENS----------------------------//

let logMensagensTeste;
// setInterval(logMensagens,3000);
logMensagens();
let ultimaMensagem  = {};
let historicoMensagens;

function logMensagens(){
    let mensagensAnterior = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagensAnterior.then(gerarMensagens);
}

function gerarMensagens(resposta){
historicoMensagens = resposta.data;

if(Object.keys(ultimaMensagem).length !== 0){
    let indexSlice = historicoMensagens.indexOf(ultimaMensagem);
    
    
    if(resposta.data.includes(ultimaMensagem)){
        indexSlice = resposta.data.indexOf(ultimaMensagem);
        resposta.data = resposta.data.slice(indexSlice+1);
        console.log("não devia imprimir nada");
        resposta.data ={};
        //esvazaio o objeto pra não rolar nada
        console.log(ultimaMensagem);


    }
    else{
    console.log(ultimaMensagem);
    console.log(resposta.data[indexSlice]);
    console.log(indexSlice);
}}


else{console.log("errou");}
// escreverMensagens();
// }

// function escreverMensagens(resposta){
for(let ii=0; ii<resposta.data.length;ii++){
  
    let conteudo = document.querySelector(".conteudo");
  
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
    else if (tipoMensagem == "private_message" && resposta.data[ii].to== nomeUsuarioFornecido)
    //tem que corrigir esse condicional depois
    {
        tipoDeMensagem = "mensagem-geral privada";
    }
    else{tipoMensagem == "hidden"}
    conteudo.innerHTML +=` <div class = ${tipoDeMensagem}> <span class = "tempo">${resposta.data[ii].time}</span>
    <span class = "from">${resposta.data[ii].from}</span>
    <span>para</span>
    <span class = "to">${resposta.data[ii].to}</span>
    <span class = "mensagem">${resposta.data[ii].text}</span></div>`;
}
}
// fecha o for
ultimaMensagem = resposta.data[resposta.data.length-1];
console.log(ultimaMensagem);//é aqui que era é atualizada

}

function enviarMensagem(){
    let mensagemDigitada = document.getElementById("mensagem").value;
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
// statusEnvio.catch(window.location.reload());    
    }
}