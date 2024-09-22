let listaNumerosSorteados = [];
let quantidadeNumeros = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;    
    /**
     * Essa funcionalidade não é nativa. Precisa do import na tag script. 
     * Documentação em https://responsivevoice.org/
     * 
     * param1: O que vai ser falado
     * param2: Lingua (conferir documentação)
     * param3: Objeto; Rate: Velocidade da fala.
     */
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    //let titulo = document.querySelector('h1');
    //titulo.innerHTML = 'Jogo do número secreto!';

    exibirTextoNaTela('h1', 'Jogo do número secreto!');

    //let paragrafo = document.querySelector('p');
    //paragrafo.innerHTML = 'Escolha um número entre 1 e 10...';

    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10...');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        limparCampo();
        tentativas++;
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumeros + 1);

    if (listaNumerosSorteados.length === quantidadeNumeros) {
        listaNumerosSorteados = [];
    }


    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    //Não precisa declarar novamente pois essa variavel ja tem um espaço reservado na memória
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}