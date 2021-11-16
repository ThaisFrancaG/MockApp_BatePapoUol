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
    let statusAtividade = axios.post('https://mock-api.driven.com.br/api/v4/uol/status',nomeUsuarioObj);

    statusAtividade.then(console.log("logado"));
    statusAtividade.catch(analiseErroLogado);
}

function analiseErroLogado(){
alert("Desculpe, mas você foi deslogado por inatividade!");
window.location.reload();
}
// -----------------------------------------------------------------------------------------------PEGAR MENSAGENS----------------------------//

setInterval(logMensagens,3000);

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
    console.log(logAtual);

for(let ii=0; ii<logAtual.length;ii++){
  

    if(logAtual[ii].from.length>15){
        logAtual[ii].from = logAtual[ii].from.slice(0,14);
        logAtual[ii].from =  logAtual[ii].from+"...";
    }

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
    else if (tipoMensagem == "private_message" && logAtual[ii].to== usuario)
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
   
    }
}

// Bônus 1 - Usuários Online
UsuariosOnline();

setInterval(UsuariosOnline,10000);

function UsuariosOnline(){
    let usuariosOnline = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    usuariosOnline.then(listaUsuarios);
    usuariosOnline.catch(console.log("Tivemos um problema ao buscar os usuários!"));
}

function listaUsuarios(nomes){
let listaUsuariosOnline = document.querySelector(".lista-usuarios");

listaUsuariosOnline.innerHTML ="";
listaUsuariosOnline.innerHTML ='<li class = "selecionado" onclick = "usuarioMensagemPrivada()"> <ion-icon name="people"></ion-icon> Todos <ion-icon class = "check"name="checkmark"></ion-icon></li>';
    for(let i = 0; i<nomes.data.length;i++){
        if(nomes.data[i].name.length>15){
            nomes.data[i].name = nomes.data[i].name.slice(0,14);
            nomes.data[i].name =  nomes.data[i].name+"...";
        }

 listaUsuariosOnline.innerHTML += `<li onclick = "usuarioMensagemPrivada(this)"><ion-icon name="person-circle"></ion-icon>${nomes.data[i].name}<ion-icon class = "check" name="checkmark"></ion-icon></li>`;}
 
}

function usuarioMensagemPrivada(usuarioPrivado){
    let selecionadoAnterior = document.querySelector(".selecionado");
    if(selecionadoAnterior!==null){
        selecionadoAnterior.classList.remove("selecionado");
        usuarioPrivado.classList.add("selecionado");}
    else{usuarioPrivado.classList.add("selecionado");}

    if(usuarioPrivado.innerText === "Todos"){
        
alert("mensagens privadas");

    }

    else{ alert(`mensagem privada para${usuarioPrivado.innerText}`)}
}



function verListaUsuarios() {
let fundo  = document.querySelector(".tela-navegacao");
let barraLateral  = document.querySelector(".configuracoes-mensagem");
barraLateral.style.display = 'flex';
fundo.style.display = 'block';
}

function voltarAoChat() {
    let fundo  = document.querySelector(".tela-navegacao");
    let barraLateral  = document.querySelector(".configuracoes-mensagem");
    barraLateral.style.display = 'none';
    fundo.style.display = 'none';
    }