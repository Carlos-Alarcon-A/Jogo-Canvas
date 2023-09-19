const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function piso(){
    ctx.beginPath();
    ctx.strokeStyle = '#206e2e';
    ctx.lineWidth = 5;
    ctx.moveTo(0,700);
    ctx.lineTo(900,700);
    ctx.lineTo(900,800);
    ctx.lineTo(0,800);
    ctx.lineTo(0,700);
    ctx.fillStyle = '#228a35';
    ctx.fill();
    ctx.stroke();
}

function personagem(){
    //Cabeça
    ctx.beginPath();
    ctx.fillStyle = '#bf967a';
    ctx.fillRect(moverPersonagem,600,25,25);
    ctx.fillRect(moverPersonagem+8,625,10,10);

    //Braços
    ctx.beginPath();
    ctx.strokeStyle = '#9e1b2c';
    ctx.lineWidth = 8;
    ctx.moveTo(moverPersonagem-5,630);
    ctx.lineTo(moverPersonagem-5,590);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#9e1b2c';
    ctx.lineWidth = 8;
    ctx.moveTo(moverPersonagem+30,630);
    ctx.lineTo(moverPersonagem+30,590);
    ctx.stroke();

    //Tronco
    ctx.beginPath();
    ctx.fillStyle = '#9e1b2c';
    ctx.fillRect(moverPersonagem-7,630,40,35);

    //Pernas
    ctx.beginPath();
    ctx.fillStyle = '#282b4f';
    ctx.fillRect(moverPersonagem-7,660,40,15);
    ctx.fillRect(moverPersonagem-7,660,15,40);
    ctx.fillRect(moverPersonagem+18,660,15,40);

    //Cesta
    ctx.beginPath();
    ctx.fillStyle = '#382c24';
    ctx.fillRect(moverPersonagem-15,570,55,25);
}

function coracao(){
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(posicaoXcoracao+17,cairCoracao,13,10);
    ctx.fillRect(posicaoXcoracao,cairCoracao,13,10);
    ctx.fillRect(posicaoXcoracao,cairCoracao+8,30,7);
    ctx.fillRect(posicaoXcoracao+5,cairCoracao+15,20,7);
    ctx.fillRect(posicaoXcoracao+11,cairCoracao+20,7,7);
}

//Variáveis
var moverPersonagem = 100;
var velocidade = 10;

var coracoesPegos = 0;
var vida = 3;

var cairCoracao = 10;
var velocidadeQueda = 2;
var posicaoXcoracao = Math.floor(Math.random()*850);

function animacao(){
    ctx.clearRect(0,0,900,800);
    piso();
    coracao();
    personagem();

    //Fazer coração cair
    if(cairCoracao>=810){
        velocidadeQueda += 0.25;
        posicaoXcoracao = Math.floor(Math.random()*850);
        cairCoracao = -20;
        vida--;
    }

    cairCoracao += velocidadeQueda;

    //Colisão
    if(posicaoXcoracao >= moverPersonagem-20 && posicaoXcoracao <= moverPersonagem+20 && cairCoracao >= 570 && cairCoracao <= 600){
        velocidadeQueda += 0.25;
        posicaoXcoracao = Math.floor(Math.random()*850);
        cairCoracao = -20;
        coracoesPegos++;
    }

    //Textos na tela
    const textoPegos = `Corações pegos: ${coracoesPegos}`;
    ctx.font = '22px verdana black';
    ctx.fillStyle = '#000';
    ctx.fillText(textoPegos, 10,50);

    const textoVida = `Vidas: ${vida}`;
    ctx.font = '22px verdana black';
    ctx.fillStyle = '#941e1e';
    ctx.fillText(textoVida, 10,90);


    //Vitória e derrota
    if(coracoesPegos >= 15){
        velocidade = 0;
        velocidadeQueda = 0;
        posicaoXcoracao = -100;
        const textoVitoria = `Você conseguiu coletar todos os corações!`;
        ctx.font = '30px verdana black';
        ctx.fillStyle = '#249e45';
        ctx.fillText(textoVitoria, 100,380);
    }

    if(vida <= 0){
        velocidade = 0;
        velocidadeQueda = 0;
        posicaoXcoracao = -100;
        const textoDerrota = `Você perdeu todas as suas vidas!`;
        ctx.font = '30px verdana black';
        ctx.fillStyle = '#ff0000';
        ctx.fillText(textoDerrota, 190,380);
    }

    requestAnimationFrame(animacao);
}

function inicio(){
    document.getElementById('iniciar').remove();
    document.addEventListener('keydown', function(event){
        if(event.key === 'd' || event.key === 'D'){
            moverPersonagem += velocidade;
        }
        if(event.key === 'a' || event.key === 'A'){
            moverPersonagem -= velocidade;
        }

        if(moverPersonagem <= 15){
            moverPersonagem=15;
        }
        if(moverPersonagem >= 865){
            moverPersonagem=865;
        }
    });

    animacao();
}

piso();
personagem();