window.onload = function(){
//seleção das categorias
const cats = Array.from(document.querySelectorAll('#for_sections > div'));
let time_touch = 0;
let arrastando = false; // impedir seleção se for click de rolagem

document.querySelector("#for_sections").addEventListener("mousedown", () => {
  arrastando = false;
});
document.querySelector("#for_sections").addEventListener("mousemove", () => {
  arrastando = true;
});

cats.forEach(el => {
  const startPress = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return; // Só botão esquerdo
    time_touch = Date.now();
    arrastando = false;
  };

  const detectMove = () => {
    arrastando = true;
  };

  const endPress = (e) => {
    if (arrastando) return;
    if (Date.now() - time_touch < 100) {
      cats.forEach(div => div.classList.remove("catselected"));
      e.currentTarget.classList.add("catselected");
    }
  };

  el.addEventListener("mousedown", startPress);
  el.addEventListener("mousemove", detectMove);
  el.addEventListener("mouseup", endPress);

  el.addEventListener("touchstart", startPress);
  el.addEventListener("touchmove", detectMove);
  el.addEventListener("touchend", endPress);
});

//Troca de icones
let icones = [...document.querySelectorAll("#for_sections div img")];
let srcs= [...(icones.map(el => el.src))]

//limites de rolagem para anuncios
const imgs_anun = document.getElementById('imgs_anun');
let larg_anuncio = document.getElementById('anuncio').offsetWidth;
let gap_imgs_anuncio = parseFloat(getComputedStyle(document.getElementById('imgs_anun')).getPropertyValue('gap'));
let quant_anun = [...document.querySelectorAll('#imgs_anun>img')].length;
let larg_img = document.querySelector('#imgs_anun>img').offsetWidth;
let larg_imgs_anun = gap_imgs_anuncio *(quant_anun-1) + larg_img * quant_anun;
let meio = larg_anuncio/2 - larg_imgs_anun/2;
let fim_anun = larg_anuncio - larg_imgs_anun;

imgs_anun.style.transform = `translateX(${meio}px)`;

//limites de rolagem para seções

let secoes = document.getElementById('for_sections');
let part_sections = document.getElementById('part_sections');
const style_sections = getComputedStyle(secoes);
let gap = parseFloat(style_sections.gap);
let width_sections = 1200 + (gap * 11)+5;
let larg_partSections = part_sections.offsetWidth;
let fim_sections = -(width_sections - larg_partSections);
if (window.innerWidth >= 1373) fim_sections=0;

//limites de rolagem para produtos
const promos= document.getElementById('promos')
let larg_for_promos = promos.offsetWidth;
let gap_parte = parseFloat(getComputedStyle(document.getElementById('parteUm')).getPropertyValue('gap'));
let quant_part = [...document.querySelectorAll('#parteUm > div')].length;
let larg_prod = document.querySelector('.for_prod').offsetWidth;
let larg_part = quant_part * larg_prod + gap_parte*(quant_part-1);
let margin_for_promos = parseFloat(getComputedStyle(document.getElementById('for_promos')).getPropertyValue('margin-left'));
let fim_promos = larg_for_promos - larg_part - (margin_for_promos*2);
if (window.innerWidth >= 1373){fim_promos += (margin_for_promos*2);}

//conjunto de limites
let limi = [ 
  { div: imgs_anun, arraste: meio, limite: fim_anun, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: secoes, arraste: 0, limite: fim_sections, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: promos, arraste: 0, limite: fim_promos, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false }
];

// Adiciona event listeners com o índice
limi.forEach((el, index) => {
  el.div.addEventListener('touchstart', (e) => iniciarArraste(e, index));
  el.div.addEventListener('mousedown', (e) => iniciarArraste(e, index));
  el.div.addEventListener('touchmove', (e) => aoMover(e, index));
  el.div.addEventListener('mousemove', (e) => aoMover(e, index));
  el.div.addEventListener('touchend', (e) => finalizarArraste(e, index));
  el.div.addEventListener('mouseup', (e) => finalizarArraste(e, index));
});


let initialY = null;

// Início do arraste
const iniciarArraste = (e, i) => {
  e.preventDefault();
  const posicaoX = e.touches ? e.touches[0].clientX : e.clientX;
  initialY = e.touches[0].clientY;

  limi[i].toc_ini = posicaoX - limi[i].arraste;
  limi[i].toc_ini2 = posicaoX;
  limi[i].time_touch = Date.now();
  limi[i].arrastando = true;
  if (limi[i].animacaoRolagem) {
    cancelAnimationFrame(limi[i].animacaoRolagem);
    limi[i].animacaoRolagem = null;
  }
};

// Movimento do arraste
const aoMover = (e, i) => {
  if (!limi[i].arrastando) return;

  const posicaoX = e.touches ? e.touches[0].clientX : e.clientX;
  const tempoAtual = Date.now();

  const currentY = e.touches[0].clientY;
  const diffY = currentY - initialY;
  window.scrollBy(0, -diffY);
  initialY = currentY;

  // Calcula a velocidade do movimento
  const tempoDecorrido = tempoAtual - limi[i].time_touch;
  if (tempoDecorrido > 0) {
    limi[i].velocidade = (posicaoX - limi[i].toc_ini2) / tempoDecorrido; // px/ms
  }

  limi[i].toc_ini2 = posicaoX;
  limi[i].time_touch = tempoAtual;
  limi[i].arraste = posicaoX - limi[i].toc_ini;

  // Aplicar limites corretamente
  aplicarLimites(i);
  limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;
};

// Finalizar arraste e iniciar desaceleração
const finalizarArraste = (e, i) => {
  if (!limi[i].arrastando) return;
  limi[i].arrastando = false;

  initialY = null;
  const desacelerar = () => {
    if (Math.abs(limi[i].velocidade) > 0.01) { // Valor mínimo para parar
      limi[i].velocidade *= 0.95; // Reduz gradualmente a velocidade
      limi[i].arraste += limi[i].velocidade * 16; // Multiplica pela estimativa de 16ms/frame

      // Aplicar limites corretamente
      aplicarLimites(i);
      limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;
      limi[i].animacaoRolagem = requestAnimationFrame(desacelerar);
    } else {
      limi[i].animacaoRolagem = null; // Finaliza a animação
    }
  };
  desacelerar();
};

// Função auxiliar para aplicar limites
const aplicarLimites = (i) => {
  if (limi[i].arraste < limi[i].limite) {
    limi[i].arraste = limi[i].limite;
    limi[i].velocidade = 0;
  }
  if (limi[i].arraste > 0) {
    limi[i].arraste = 0;
    limi[i].velocidade = 0;
  }
};

/*
let verificou = false;
let isTouchPad = null;
let posicaoAtual = arraste;

const aoRolar = (e) => {

  if (!verificou) { 
    verificou = true; 
    if (Math.abs(e.deltaX) < 80) {isTouchPad = true;} //se for touchPad 
    else {isTouchPad = false;}
  }
  if (!isTouchPad) {return;}

  arraste -= e.deltaX * 0.7; // rolagem do scroll diminuida pela metade
  if (arraste < limite) arraste = limite;
  if (arraste > 0) arraste = 0;

  if (!animacaoRolagem) {
    animacaoRolagem= true;
    requestAnimationFrame(animar);
  }
};

function animar() {
  let deltaX = arraste - posicaoAtual;
  if (Math.abs(deltaX) > 0.1) {
    posicaoAtual += deltaX * 0.1; // Ajuste o fator de suavização aqui
    secoes.style.transform = `translateX(${posicaoAtual}px)`;
    requestAnimationFrame(animar);
  } else {
    arraste = posicaoAtual;
    secoes.style.transform = `translateX(${posicaoAtual}px)`;
    animacaoRolagem = false; // Para a animação quando o alvo é atingido
  }
}
secoes.addEventListener('wheel', aoRolar);
*/
};
