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


// Seleção do footer
const div_footer= [...document.querySelectorAll('footer>div')];
div_footer.forEach(e=>{
  e.addEventListener("mousedown", startPress);
  e.addEventListener("mouseup", endPress);
  e.addEventListener("touchstart", startPress);
  e.addEventListener("touchend", endPress);

  function startPress(e) {
    time_touch = Date.now();
  }
  function endPress(e) {
    if (Date.now() - time_touch < 100) {
      div_footer.forEach(div => div.classList.remove("selected1"));
      e.currentTarget.classList.add("selected1");
    }
  }
})

//Troca de icones
let icones = [...document.querySelectorAll("#for_sections div img")];
let srcs= [...(icones.map(el => el.src))]

//limites de rolagem para anuncios
const imgs_anun = document.getElementById('imgs_anun');
let larg_anuncio = document.getElementById('anuncio').offsetWidth;
let gap_imgs_anuncio = parseFloat(getComputedStyle(document.getElementById('imgs_anun')).getPropertyValue('gap'));
let quant_anun = [...document.querySelectorAll('#imgs_anun>img')].length;
let larg_img = document.querySelector('#imgs_anun>img').offsetWidth;
let larg_imgs_anun = gap_imgs_anuncio *(quant_anun-1) + larg_img * quant_anun +2;
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
let fim_promos = larg_for_promos - larg_part - (margin_for_promos);
if (window.innerWidth >= 1373){fim_promos+=26;}

//conjunto de limites
let limi = [ 
  { div: imgs_anun, arraste: meio, limite: fim_anun, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: secoes, arraste: 0, limite: fim_sections, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: promos, arraste: 0, limite: fim_promos, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false }
];

// Adiciona event listeners com o índice

limi.forEach((el, index) => {
  el.div.addEventListener('touchstart', (e) => iniciarArraste(e, index),{ passive: false });
  el.div.addEventListener('mousedown', (e) => iniciarArraste(e, index),{ passive: false });
  el.div.addEventListener('touchmove', (e) => aoMover(e, index),{ passive: false });
  el.div.addEventListener('mousemove', (e) => aoMover(e, index),{ passive: false });
  el.div.addEventListener('touchend', (e) => finalizarArraste(e, index));
  el.div.addEventListener('mouseup', (e) => finalizarArraste(e, index));
});


let initialY = null;
let initialX = null;
let diffX=null;
let diffY=null;
let firstAngle = null;
let firstDiffX = null;
let firstDiffY = null;
let dragY= null;

// Início do arraste
const iniciarArraste = (e, i) => {
  e.preventDefault();
  const posicaoX = e.touches ? e.touches[0].clientX : e.clientX;
 
  initialY =  e.touches ? e.touches[0].clientY : e.clientY;
  initialX =  e.touches ? e.touches[0].clientX : e.clientX;

  limi[i].toc_ini = posicaoX - limi[i].arraste;
  limi[i].time_touch = Date.now();
  limi[i].arrastando = false;
  if (limi[i].animacaoRolagem) {
    cancelAnimationFrame(limi[i].animacaoRolagem);
    limi[i].animacaoRolagem = null;
  }
};

// Movimento do arraste
const aoMover = (e, i) => {
  e.preventDefault();
  const tempoAtual = Date.now();
  const posicaoX = e.touches ? (e.touches[0] ? e.touches[0].clientX : null) : e.clientX;
  const currentY = e.touches ? (e.touches[0] ? e.touches[0].clientY : null) : e.clientY;

  if (posicaoX === null || currentY === null) return;
  diffX = Math.abs(posicaoX - initialX);
  diffY = Math.abs(currentY - initialY);

  // Limiar para ignorar movimentos muito pequenos
  const limiar = 1;
  if (diffX < limiar && diffY < limiar) return;

  if (firstDiffX === null && firstDiffY === null) {
    firstDiffX = diffX;
    firstDiffY = diffY;
    firstAngle = Math.atan2(diffY, diffX) * (180 / Math.PI);
  }
  if (firstAngle < 45) {
    limi[i].arrastando = true;
    dragY= false;
    const tempoDecorrido = tempoAtual - limi[i].time_touch;
    if (tempoDecorrido > 0) {
      limi[i].velocidade = (posicaoX - limi[i].toc_ini2) / tempoDecorrido; // px/ms
    }
    limi[i].time_touch = tempoAtual;
    limi[i].toc_ini2 = posicaoX;
    limi[i].arraste = posicaoX - limi[i].toc_ini;
    aplicarLimites(i);
    limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;

    initialX = posicaoX;
  }
};

// Finalizar arraste e iniciar desaceleração
const finalizarArraste = (e, i) => {
  if(!dragY){
    if (!limi[i].arrastando) return;
    limi[i].arrastando = false;

    initialY = null; initialX = null; 
    firstAngle = null; firstDiffX = null; 
    firstDiffY = null;
    dragY=null;
  
    const desacelerar = () => {
      if (Math.abs(limi[i].velocidade) > 0.01) { // Valor mínimo para parar
        limi[i].velocidade *= 0.95; // Reduz gradualmente a velocidade
        limi[i].arraste += limi[i].velocidade * 16; // Multiplica pela estimativa de 16ms/frame
        // Aplicar limites corretamente
        aplicarLimites(i);
        limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;
        limi[i].animacaoRolagem = requestAnimationFrame(desacelerar);
      } else {
        limi[i].animacaoRolagem = null;
      }
    };
    desacelerar();
  }
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

//Rolagem touchPad
let verificou = false;
let isTouchPad = null;

const aoRolar = (e) => {
  let target = e.currentTarget;
  let i = limi.findIndex(item => item.div === e.currentTarget);
  if (i === -1) return;
  let posicaoAtual = limi[i].arraste;
  
  if (!verificou) { 
    verificou = true; 
    if (Math.abs(e.deltaX) < 80) {isTouchPad = true;} //se for touchPad 
    else {isTouchPad = false;}
  }
  if (!isTouchPad) {return;}

  limi[i].arraste -= e.deltaX; // rolagem do scroll diminuida
  if (limi[i].arraste < limi[i].limite) limi[i].arraste = limi[i].limite;
  if (limi[i].arraste > 0) limi[i].arraste = 0;

  if (!limi[i].animacaoRolagem) {
    limi[i].animacaoRolagem= true;
    requestAnimationFrame(animar);
  }

  function animar(e) {
    let deltaX = limi[i].arraste - posicaoAtual;
    if (Math.abs(deltaX) > 0.1) {
      posicaoAtual += deltaX * 0.3;
      target.style.transform = `translateX(${posicaoAtual}px)`;
      requestAnimationFrame(animar);
    } else {
      limi[i].arraste = posicaoAtual;
      target.style.transform = `translateX(${posicaoAtual}px)`;
      limi[i].animacaoRolagem = false;
    }
  }
};
imgs_anun.addEventListener('wheel', aoRolar);
secoes.addEventListener('wheel', aoRolar);
promos.addEventListener('wheel', aoRolar);

// Rolagem da pagina
/*
let startY, startX, startTime, isScrolling = false, speed = 0, deltaY = 0, deltaY2=0, deltaX=0, angle=0;
const minSpeed = 0.7; // Velocidade mínima para garantir animação
const maxSpeed = 2.0;

// Iniciar toque
document.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
  startTime = Date.now();
  isScrolling = false;
  speed = 0;
  deltaY = 0;
}, { passive: true });

// Mover
document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const currentY = e.touches[0].clientY;
  const currentX = e.touches[0].clientX;
  const currentTime = Date.now();
  const deltaTime = currentTime - startTime;
  deltaY = currentY - startY;

  let all_deltaY= Math.abs(currentY - startY);
  let all_deltaX= Math.abs(currentX - startX);

  const limiar = 1;
  if (all_deltaX < limiar && all_deltaY < limiar) return;

  if(deltaY2==0 && deltaX==0){
    deltaY2= all_deltaY;
    deltaX= all_deltaX;
    angle = Math.atan2(deltaY2, deltaX) * (180 / Math.PI);
  }
  if(angle > 60){
    if (deltaTime > 0) {
      speed = deltaY / deltaTime;
      speed = Math.sign(speed) * Math.max(minSpeed, Math.min(Math.abs(speed), maxSpeed));
    }
    window.scrollBy(0, -deltaY);
    startY = currentY;
    startTime = currentTime;
    isScrolling = true;
  }
}, { passive: false });

// Finalizar
document.addEventListener('touchend', () => {
  if (isScrolling) {
    if (Math.abs(speed) < minSpeed) {
      speed = minSpeed * Math.sign(speed); // Garante movimento mínimo
    }
    startMomentumScroll();
  }
  deltaY2=0; deltaX=0; angle=0;
});

function startMomentumScroll() {
  const decay = 0.95; // Redução gradual da velocidade
  const step = () => {
    if (Math.abs(speed) > 0.1) { // Evita paradas bruscas
      speed *= decay;
      window.scrollBy(0, -speed * 16);
      requestAnimationFrame(step);
    } else {
      isScrolling = false;
    }
  };
  requestAnimationFrame(step);
}
*/
};

