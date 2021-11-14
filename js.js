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
    let statusAtividade = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nomeUsuarioObj);

    // statusAtividade.then(console.log("logado"));
    // statusAtividade.catch(console.log("ops"));
}
// -----------------------------------------------------------------------------------------------PEGAR MENSAGENS----------------------------//

let logMensagensTeste;

setInterval(logMensagens,3000);
logMensagens();

let historicoMensagens;

function logMensagens(){
    let mensagensAnterior = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagensAnterior.then(gerarMensagens);
}

let logAnterior;
let x = 0;

function gerarMensagens(resposta){
 let iguais=0;
 let diferentes=0;
 if(Object.keys(ultimaMensagem).length !== 0){

    for (let i=0;i<100;i++){
        if(logAnterior[i].time!==resposta.data[i].time&&logAnterior[i].text!==resposta.data[i].text){
            resposta.data+=resposta.data[i];
            diferentes++
        }
        else{
            iguais++
        }
    }
    console.log(iguais);
    console.log(diferentes);
    console.log(resposta.data.length);


}
    // if(Object.keys(ultimaMensagem).length !== 0){
    //     console.log("ok");
    //     console.log(resposta.data.length);
    //     //isso me diz se a última mensagem está vazia ou não
    //     let indexSlice = resposta.data.indexOf(ultimaMensagem);
    //     if(resposta.data[resposta.data.length-1]===ultimaMensagem){
    //         console.log("não devia imprimir nada");
    //         resposta.data ={};
    //         //esvazaio o objeto pra não rolar nada
    //     }
    //     else{
    //     resposta.data = resposta.data.slice(indexSlice);
    //     console.log(resposta.data.length);}
    // }


// else{console.log("mensagens ainda não carregadas");}

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
logAnterior = resposta.data;
console.log(logAnterior ===resposta.data);

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