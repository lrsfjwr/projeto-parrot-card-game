const imgCartas = ['assets/bobrossparrot.gif',
                   'assets/explodyparrot.gif',
                   'assets/fiestaparrot.gif',
                   'assets/metalparrot.gif',
                   'assets/revertitparrot.gif',
                   'assets/tripletsparrot.gif',
                   'assets/unicornparrot.gif'];

const deck = [ ];
let pontuacao = 0;
let jogadas = 0;
let qtdCartas = 0;
let primeiraCarta = "";
let segundaCarta = "";

function informarQtdCartas(){
    qtdCartas = Number(prompt("Digite a quantidade de cartas desejadas (entre 4 e 14):"));

while (qtdCartas % 2 !== 0 || qtdCartas < 4 || qtdCartas > 14) {
    alert("Digite números pares entre 4 e 14");
    qtdCartas = Number(prompt("Digite a quantidade de cartas desejadas (entre 4 e 14):"));
}

for (let index = 0; index < qtdCartas/2; index++) {
    
    deck.push(index, index);
   
}
embaralharCartas();
adicionarCartas(qtdCartas);
}
informarQtdCartas();

function embaralharCartas(){
    deck.sort(comparador);
    imgCartas.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5;
}

//Renderiza as cartas na tela
function adicionarCartas(qtdCartas){
    const tabuleiro = document.querySelector(".tabuleiro");
    tabuleiro.innerHTML = "";
    let novaCarta;
    
    for (let index = 0; index < qtdCartas; index++) {
        novaCarta = `<div class="carta" onclick="virarCartas(this)">
                    <div class="face frente">
                        <img src="assets/back.png">
                    </div>
                    <div class="face verso">
                        <img src="${imgCartas[deck[index]]}">
                    </div>    
                  </div>`
        tabuleiro.innerHTML += novaCarta;
              
    }   
}

//Recebe o conteudo após o jogador clicar na carta
function virarCartas(cartaClicada){
    
    let jaSelecionado = cartaClicada.classList.contains("selecionado");

    if (jaSelecionado || primeiraCarta !== "" && segundaCarta !== "") {
        return;
    }

    cartaClicada.classList.add("selecionado");

    if(primeiraCarta === ""){
        primeiraCarta = cartaClicada;
        jogadas++;
    }
    else{
        segundaCarta = cartaClicada;
        jogadas++;
    }    

    if (primeiraCarta !== "" && segundaCarta !== ""){
        compararCartas();
    }

    if(pontuacao === qtdCartas/2){
        setTimeout(parabenizacao,1000);
    }
}

function compararCartas(){

    if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
        pontuacao ++;
        primeiraCarta ="";
        segundaCarta ="";
    }
    else{
        setTimeout(desvirarCartas,1000);
    }
}


function desvirarCartas(){
    primeiraCarta.classList.remove("selecionado");
    segundaCarta.classList.remove("selecionado");

    primeiraCarta ="";
    segundaCarta = "";
}

function parabenizacao (){
    alert (`Parabéns! Você ganhou em ${jogadas} jogadas!!`);
}

