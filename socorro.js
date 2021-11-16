function gerarMensagens(resposta){
    let iguais=0;diferentes=0;
    
   if(ultimaMensagem!==null){
   //se existir uma última mensagem que foi carregada em qualquer ponto do código
    if(Object.keys(ultimaMensagem).length !== 0)
    //eu vou conferir se essa ultima mensagem tem alguma informacao dentro dela
    {
       for (let i=0;i<resposta.data.length;i++){
           //se existe yma mensagem anterior, então essa função já foi chamada antes, e por isso já existe um logAnteior, que vai ser igual a ultima resposta.data
           if(logAnterior[i].time==resposta.data[i].time&&logAnterior[i].text==resposta.data[i].text){
               iguais++;
               //ele vai ver se o mesmo texto foi enviado duas vezes exatamente no mesmo tempo. Se isso acontecer, é porque essa informaçào já existia antes    
           }
   
           else{diferentes++;logAtual.push(resposta.data[i]); 
               //estou criando um vetor contendo apenas as mensagens que estào nesse log chamado agora, mas que não estavam presentes no log anterior
           }
       } //fecha o for 
   
   } //fecha a condição onde já existia uma mensagem anterior
   
       console.log(iguais);
       console.log(diferentes);
       console.log(logAtual.length);
       console.log(typeof(logAtual));
       console.log(resposta.data.length);
   
       if(logAtual.length===0 ){
           console.log("não tem nada para imprimir");
       }}}

       