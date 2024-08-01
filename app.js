function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numero_limite}`);
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarNumeroAleatorio() {
    let numero_sorteado = parseInt((Math.random() * numero_limite + 1));
    let quantidade_de_elementos = lista_de_numeros.length

    if (quantidade_de_elementos == numero_limite) {
        lista_de_numeros = [];
    }

    if (lista_de_numeros.includes(numero_sorteado)) {
        return gerarNumeroAleatorio()
    } else {
        lista_de_numeros.push(numero_sorteado);
        return numero_sorteado
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ''
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numero_secreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou');

        let palavras_tentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem_tentativas = `Você descobriu o número secreto "${numero_secreto}" com ${tentativas} ${palavras_tentativas}`;
        exibirTextoNaTela('p', mensagem_tentativas)

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numero_secreto) {
        exibirTextoNaTela('p', 'O número secreto é menor')
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior')
    }

    tentativas++
    limparCampo()

}

function reinciarJogo() {
    numero_secreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial()

let numero_limite = 10;
let lista_de_numeros = [];
let numero_secreto = gerarNumeroAleatorio()
let tentativas = 1