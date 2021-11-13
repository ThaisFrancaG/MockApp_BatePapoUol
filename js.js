nomeUsuario();
function nomeUsuario(){
// let nomeUsuarioFornecido = prompt('Selecione um nome de usuário!');
let nomeUsuarioFornecido = 'Jfdsfsffds';
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
// -----------------------------------------------------------------------------------------------PEGAR MENSAGENS----------------------------//

//para testest
let logMensagensTeste;
setInterval(logMensagens,10000);
//A CADA 10 SEGUNDOS, ESSA FUNÇAO VAI CHAMAR O LOG MENSAGENS, O QUAL ACESSA O SERVIDORE E VÊ TODAS AS MENSAGENS QUE ESTÀO LÁ DENTRO
let ultimaMensagem  = {};
//LITERALMENTE SÓ VAI SER VAZIA NO MOMENTO EM QUE A PÁGINA CARREGA. EU A ESTOU COLOCANDO AQUI FORA PORQUE QUERO QUE ELA SEJA GLOBAL E POSSA ANDAR ENTRE AS FUNÇÕES
logMensagens();

function logMensagens(){
    let mensagensAnterior = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

    mensagensAnterior.then(gerarMensagens);
//A FUNÇÀO PEGA TODAS AS MENSAGENS QUE ESTÀO DENTRO DO SERVIDOR, E QUANDO ESSAS MENSAGENS CHEGAM, ELE CHAMA OUTRA FUNÇAO, QUE LÊ OS DADOS E OS ESCREVE

//IDEIA: EU POSSO CRIAR UMA FUNÇÃO QUE OPERA ANTES DA GERAÇÀO DE MENSAGENS, PARA QUE ESTAS SEJAM TRATADAS?
}

function gerarMensagens(resposta){

console.log(resposta.data.length);

if(Object.keys(ultimaMensagem).length !== 0){
    console.log("ok");
    //isso me diz se a última mensagem está vazia ou não
    let indexSlice = resposta.data.indexOf(ultimaMensagem);
    if(resposta.data[indexSlice]===ultimaMensagem){
        console.log("não devia imprimir nada");
        resposta.data ={};
        //esvazaio o objeto pra não rolar nada
    }
    else{
    resposta.data = resposta.data.slice(indexSlice);
    console.log(resposta.data.length);}
}
else{console.log("errou");}


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
console.log(resposta.data.length-1);
ultimaMensagem = resposta.data[resposta.data.length-1];
console.log(ultimaMensagem);

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