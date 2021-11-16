let usuario = "";
let nomeUsuarioFornecido;
let nomeUsuarioObj;
let usuarioPrivadoAtual="";
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
        conteudo.innerHTML +=` <div data-identifier="message" class = "mensagem-geral ${tipoDeMensagem}"> <span class = "tempo">(${logAtual[ii].time})</span>
        <span class = "from">${logAtual[ii].from}</span>
        <span class = "mensagem">${logAtual[ii].text}</span></div>`;
    } //primeiro condicional: mensagem de status

    else{ //esse else vau pegar tudo o que não for status
    if (tipoMensagem == "message"){
        tipoDeMensagem = "";  
    }
    else if (tipoMensagem == "private_message")
    {
        if(logAtual[ii].to.slice(0,14) == usuario.slice(0,14) || logAtual[ii].from.slice(0,14) ==usuario.slice(0,14)){
        tipoDeMensagem = "privada";}
        else{
            tipoDeMensagem = "hidden";
        }
    }
    
    conteudo.innerHTML +=` <div data-identifier="message" class ="mensagem-geral ${tipoDeMensagem}"> <span class = "tempo">(${logAtual[ii].time})</span>
    <span class = "from">${logAtual[ii].from}</span>
    <span>para</span>
    <span class = "to">${logAtual[ii].to}</span>
    <span class = "mensagem">${logAtual[ii].text}</span></div>`;
}
}
window.scrollTo(0,document.body.scrollHeight);
}

function enviarMensagem(){
    let tipoMensagem;
    let espacoTexto = document.getElementById("mensagem");
    let mensagemDigitada = espacoTexto.value;

    if (usuarioPrivadoAtual.length ===0){
        usuarioPrivadoAtual = "todos";
        tipoMensagem = "message";
    }
    else{
        tipoMensagem = "private_message";
    }
    if(mensagemDigitada!==null){
   
       let mensagemParaServidor = {
           from: usuario,
           to: usuarioPrivadoAtual,
           text: mensagemDigitada,
           type: tipoMensagem
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
}

function listaUsuarios(nomes){
    
let listaUsuariosOnline = document.querySelector(".lista-usuarios");
listaUsuariosOnline.innerHTML ="";
if(usuarioPrivadoAtual.length==0){listaUsuariosOnline.innerHTML ='<li class = "selecionado" onclick = "usuarioMensagemPrivada(this)"><div> <ion-icon name="people"></ion-icon>Todos </div><ion-icon class = "check"name="checkmark"></ion-icon></li>';}

else{listaUsuariosOnline.innerHTML ='<li onclick = "usuarioMensagemPrivada(this)"><div> <ion-icon name="people"></ion-icon>Todos </div><ion-icon class = "check"name="checkmark"></ion-icon></li>';}

    for(let i = 0; i<nomes.data.length;i++){
        if(nomes.data[i].name.length>15){
            nomes.data[i].name = nomes.data[i].name.slice(0,14);
            nomes.data[i].name =  nomes.data[i].name+"...";
        }
        if(nomes.data[i].name === usuarioPrivadoAtual){
            
        listaUsuariosOnline.innerHTML += `<li data-identifier="participant" class = "selecionado" onclick = "usuarioMensagemPrivada(this)"><div><ion-icon name="person-circle"></ion-icon>${nomes.data[i].name}</div><ion-icon class = "check" name="checkmark"></ion-icon></li>`;
        }
        else{   listaUsuariosOnline.innerHTML += `<li data-identifier="participant" onclick = "usuarioMensagemPrivada(this)"><div><ion-icon name="person-circle"></ion-icon>${nomes.data[i].name}</div><ion-icon class = "check" name="checkmark"></ion-icon></li>`;}


 
}}

function usuarioMensagemPrivada(usuarioPrivado){
    let selecionadoAnterior = document.querySelector(".selecionado");
    if(selecionadoAnterior!==null){
        selecionadoAnterior.classList.remove("selecionado");
        usuarioPrivado.classList.add("selecionado");}
    else{usuarioPrivado.classList.add("selecionado");}


    if(usuarioPrivado.innerText == "Todos"){

     let textoMensagem = document.getElementById("mensagem");
     textoMensagem.placeholder = "Escreva aqui...";
     usuarioPrivadoAtual = "";
     let mensagemPublica  = document.querySelector(".cadeado-aberto");
     mensagemPublica.classList.add("selecionado");
     let estadoMensagem = document.querySelector(".cadeado-fechado");
     estadoMensagem.classList.remove("selecionado");
    }

    else{ usuarioPrivadoAtual = usuarioPrivado.innerText;
        let textoMensagem = document.getElementById("mensagem");
        let mensagemPublica = document.querySelector(".cadeado-aberto");
        mensagemPublica .classList.remove("selecionado");
        let estadoMensagem = document.querySelector(".cadeado-fechado");
        estadoMensagem.classList.add("selecionado");
        textoMensagem.placeholder = `Escreva aqui...
        Enviando mensagem para ${usuarioPrivadoAtual} (reservadamente)`;}
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