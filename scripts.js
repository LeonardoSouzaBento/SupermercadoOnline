window.onload = function(){

const div_entrada = document.getElementById('div_entrada')
div_entrada.style.opacity = '0%';
setTimeout(() => {
  div_entrada.style.display = 'none';
}, 1200);

//seleção dos icones de categorias
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
    if (e.type == "mousedown" && e.button !== 0) return;
    time_touch = Date.now();
  };

  const detectMove = () => {
    arrastando = true;
  };

  const endPress = (e) => {
    if (arrastando) {
      arrastando = false;
      return;
  }
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
const div_footer = [...document.querySelectorAll('footer>div')]
const inicio = document.getElementById('botaoInicio');
const maisFooter = document.getElementById('maisFooter');
const colarLista = document.getElementById('colarLista');

const mais_opcoes = document.querySelector('#userEnotif div:nth-child(2)');
const menu = document.querySelector('body > menu');
const for_opcoes= document.getElementById('for_opcoes')
const pastlistDiv = document.getElementById('pastlist');
const buttonVoltar = document.getElementById('voltar');

let i = 0; //memorizar a div com classe no menu atras de mais opções
let ispastListOn = false;

function startPress(e) {
  time_touch = Date.now();
  if(e.touches){
    div_footer.forEach((e)=>{
      e.removeEventListener("mousedown", startPress); 
      e.removeEventListener("mouseup", endPress);
    })
  }
  else{
    div_footer.forEach((e)=>{
      e.removeEventListener("touchstart", startPress); 
      e.removeEventListener("touchend", endPress);
    })
  }
}

function endPress(e) {
  if(e.touches){
    div_footer.forEach((e)=>{
      e.removeEventListener("mousedown", startPress); 
      e.removeEventListener("mouseup", endPress);
    })
  }
  else{
    div_footer.forEach((e)=>{
      e.removeEventListener("touchstart", startPress); 
      e.removeEventListener("touchend", endPress);
    })
  }

  //Seleção
  let isInicioOn = null;
  if (Date.now() - time_touch < 100) {
    //inicio
    if(e.currentTarget == inicio){
      i=0;
      isInicioOn = true;
      div_footer.forEach(div => div.classList.remove("selected1"));
      e.currentTarget.classList.add("selected1");
      //sair de pastlist no com o botão inicio
      if(ispastListOn && isInicioOn){
        setTimeout(() => {
          pastlistDiv.style.backgroundColor = "rgba(255, 255, 255, 0.252)";
        }, 20);
        setTimeout(() => {
          pastlistDiv.style.display= "none";
        }, 500);
        ispastListOn = false;
    }}
    //botão colar lista
    if(e.currentTarget == colarLista){
      i=1;
      div_footer.forEach(div => div.classList.remove("selected1"));
      e.currentTarget.classList.add("selected1");

      ispastListOn = true
      pastlistDiv.style.display = "block";
      document.body.style.overflowY = "hidden";
      setTimeout(() => {
        pastlistDiv.style.backgroundColor = "white";
      }, 20);
    }
    if(e.currentTarget == maisFooter){
      div_footer.forEach(div => div.classList.remove("selected1"));
      e.currentTarget.classList.add("selected1");

      document.body.style.overflowY = "hidden";
      menu.removeEventListener("click", voltar);
      menu.style.display= "block";
      setTimeout(() => {
        menu.style.opacity= "100%";
      }, 20);
      setTimeout(() => {
        for_opcoes.style.transform= "translateX(0%)";
      }, 320);
      setTimeout(() => {
        menu.addEventListener("click", voltar);
      }, 330);
    }
  } //apenas tempo de toque curto
}

div_footer.forEach((e)=>{
  e.addEventListener("mousedown",  startPress);
  e.addEventListener("mouseup", endPress);
  e.addEventListener("touchstart",  startPress);
  e.addEventListener("touchend", endPress);
})

//botao voltar em colar lista
function voltarColarLista(){
  div_footer.forEach(div => div.classList.remove("selected1"));
  div_footer[0].classList.add("selected1");

  buttonVoltar.style.display= "none";
  document.body.style.overflowY = "auto";
  setTimeout(() => {
    pastlistDiv.style.backgroundColor= "rgba(255, 255, 255, 0)";
  }, 20);
  setTimeout(() => {
    pastlistDiv.style.display= "none";
    buttonVoltar.style.display= "flex";
  }, 420);
}
buttonVoltar.addEventListener("click", voltarColarLista);


//Mais opções no desktop e voltar no menu atras de opcoes
function mostrarMais() {
  document.body.style.overflowY = "hidden";
  menu.style.display= "block";
  setTimeout(() => {
    menu.style.opacity= "100%";
  }, 150);
  setTimeout(() => {
    for_opcoes.style.transform= "translateX(0%)";
  }, 750);
}
function voltar(){ //i global usado aqui
  document.body.style.overflowY = "auto";
  div_footer.forEach(div => div.classList.remove("selected1"));
  div_footer[i].classList.add("selected1");
  setTimeout(() => {
    for_opcoes.style.transform= "translateX(100%)";
  }, 10);
  setTimeout(() => {
    menu.style.opacity= "0%";
  }, 600);
  setTimeout(() => {
    menu.style.display= "none";
  }, 1200);
}
mais_opcoes.addEventListener("click", mostrarMais);
menu.addEventListener("click", voltar);

//Troca de icones (não aplicada ainda)
let quant_secoes=0;
function calcQuantIcons() {
  let width_screnn = window.innerWidth;
  let for_sections_gap = parseFloat(getComputedStyle(document.getElementById('for_sections')).getPropertyValue('gap'));
  let width_img_section = 100 + for_sections_gap + 4;
  let quant_sections= width_screnn/width_img_section;
  let inteiro = Math.floor(quant_sections);
  let decimal = (quant_sections - inteiro) * 100;
  decimal > 60 ?  quant_sections = inteiro + 1 : quant_sections = inteiro;
  quant_secoes = quant_sections;
}
calcQuantIcons();
if(window.innerWidth >= 1375) quant_secoes = quant_secoes - 2;

let imgs_icones = [...document.querySelectorAll("#for_sections div img")];
imgs_icones.splice(0,1); imgs_icones.splice(-1,1);
let srcs_parte1= [...(imgs_icones.map(el => el.getAttribute("src")))] //el.src pega o caminho completo
srcs_parte1 = srcs_parte1.map((el) => el.split('/')[0] + '/'); //dividir, pegar a primeira parte, acrescentar /

const srcs_parte2 = [
  ["feijao.png", "macarrão.png", "cafe.png"], // Mercearia
  ["balas.png", "biscoitos.png", "choco2.png", "rosca.png"], // Doces
  ["abaca.png", "ace.png", "banana.png", "batata.png", "broco.png", "cenou.png", "limao.png", "maca.png", "milho.png", "pimen.png", "tomate.png", "uvas.png"], // Hortifruti
  ["bolin.png", "bolo.png", "broa.png", "croisant.png", "pao.png"], // Padaria
  ["asac.png", "baconc.png", "bifec.png", "coxac.png", "enpanadoc.png", "espetoc.png", "frangoc.png", "linguic.png"], // Açougue
  ["agua.png", "coca.png", "ener.png", "leite.png", "ovos.png", "pizza.png", "queijo.png"], // Frios
  ["cadeado.png", "colheres.png", "fechad.png", "fog.png", "frigideira.png", "jar.png", "lampada.png", "pan.png", "rala.png", "rolo.png", "tab.png", "talheres.png"], // Casa e cozinha
  ["borrifador2.png", "esco.png", "luva.png", "rodo.png", "vas2.png", "vass2.png"], // Limpeza
  ["barbeador.png", "creme.png", "cremes.png", "espelho.png", "esponja.png", "maquiagem.png", "papel.png", "pasta_dentes.png", "pente.png"], // Higiene
  ["compasso.png", "esqua.png", "livros.png", "pincel.png"] // Papelaria
];

jotas=[
  { j: 0, max: 3 },    // Mercearia
  { j: 0, max: 4 },    // Doces
  { j: 0, max: 12 },   // Hortifruti
  { j: 0, max: 5 },    // Padaria
  { j: 0, max: 8 },    // Açougue
  { j: 0, max: 7 },    // Frios
  { j: 0, max: 12 },   // Casa e cozinha
  { j: 0, max: 6 },    // Limpeza
  { j: 0, max: 9 },    // Higiene
  { j: 0, max: 4 }     // Papelaria
]

function trocarImagens(i = 0) {

  if (i < quant_secoes) {
    if (srcs_parte2[i][jotas[i].j] != null) {
      imgs_icones[i].src = `${srcs_parte1[i]}${srcs_parte2[i][jotas[i].j]}`;
      jotas[i].j = (jotas[i].j + 1) % jotas[i].max;
    }
    else {
        jotas[i].j = 0;
    }
    setTimeout(() => {
      trocarImagens(i + 1);
    }, 100);
  } else {
    setTimeout(() => {
      trocarImagens();
    }, 100);
  }
}


//chamar a rolagem do site a partir da div anuncio
const anuncio = document.getElementById('anuncio');

let startY; let startX; let startTime1 =0; let isScrolling1 = false; let speed1 = 0; let deltaY1 = 0; let deltaY2=0; let deltaX=0; let angle=0;
const minSpeed1 = 0.7;
const maxSpeed1 = 2.0;

anuncio.addEventListener('touchstart', (e) => {
  if (!imgs_anun.contains(e.target)){
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
  startTime1 = Date.now();
  isScrolling1 = false;
  speed1 = 0;
  deltaY1 = 0;
  }
}, { passive: true });

anuncio.addEventListener('touchmove', (e) => {
  if (!imgs_anun.contains(e.target)){
  const currentY = e.touches[0].clientY;
  const currentX = e.touches[0].clientX;
  const currentTime = Date.now();
  const deltaTime = currentTime - startTime1;
  deltaY1 = currentY - startY;

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
      speed1 = deltaY1 / deltaTime;
      speed1 = Math.sign(speed1) * Math.max(minSpeed1, Math.min(Math.abs(speed1), maxSpeed1));
    }
    window.scrollBy(0, -deltaY1);
    startY = currentY;
    startTime1 = currentTime;
    isScrolling1 = true;
  }}
});

anuncio.addEventListener('touchend', (e) => {
  if (isScrolling1) {
    if (Math.abs(speed1) < minSpeed1) {
      speed1 = minSpeed * Math.sign(speed1); // Garante movimento mínimo
    }
    startMomentumScroll1();
  }
  deltaY2=0; deltaX=0; angle=0;
}
);

function startMomentumScroll1() {
  const decay = 0.95; // Redução gradual da velocidade
  const step = () => {
    if (Math.abs(speed1) > 0.1) { // Evita paradas bruscas
      speed1 *= decay;
      window.scrollBy(0, -speed1 * 16);
      requestAnimationFrame(step);
    } else {
      isScrolling1 = false;
    }
  };
  requestAnimationFrame(step);
};

function adicionarBackgroundImagem() {
  const divsFundoAnun = document.querySelectorAll('.fundo_anun');

  let styleContent = '';

  divsFundoAnun.forEach(div => {
      const imgFilha = div.querySelector('img');
      if (imgFilha) {
          const urlImagem = imgFilha.src;
          styleContent += `
              #${div.id}::before {
                  background-image: url('${urlImagem}');
              }
          `;
      }
  });

  // Cria e injeta a folha de estilos no <head> apenas uma vez
  if (styleContent) {
    let firstStyleTag = document.head.querySelector('style');
        
    if (firstStyleTag) {
        firstStyleTag.innerHTML += styleContent;
    } else {
        // Caso não exista um <style> no head, cria um
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = styleContent;
        document.head.appendChild(styleSheet);
    }
  }
}

adicionarBackgroundImagem();

//limites de rolagem para anuncios
const imgs_anun = document.getElementById('imgs_anun');
let meio = 0;
let fim_anun = 0;
let anun_visible = 0;

  function obterLimites() {
    let larg_anuncio = document.getElementById('anuncio').offsetWidth;
    let gap = parseFloat(getComputedStyle(document.getElementById('imgs_anun')).getPropertyValue('gap'));
    let quant_anun = [...document.querySelectorAll('#imgs_anun img')].length;
    let larg_img = document.querySelector('#imgs_anun img').offsetWidth;
    let larg_imgs_anun = gap *(quant_anun-1) + larg_img * quant_anun;
    if(quant_anun%2!=0) {meio = (larg_anuncio- larg_imgs_anun) /2; impar=true;}
    else{meio = (larg_anuncio - larg_imgs_anun) /2 - (larg_img/2 + gap/2);}
    fim_anun = larg_anuncio - larg_imgs_anun;

    anun_visible = larg_anuncio / (larg_img + gap);
    anun_visible>2.6? anun_visible=3 : anun_visible=1;
  }
  obterLimites();
imgs_anun.style.transform = `translateX(${meio}px)`;

//para paginação

function desenharSpans(){
  const imgsContainer = document.querySelector("#imgs_anun");
  const paginationContainer = document.querySelector("#pagination");
  
  if (imgsContainer && paginationContainer) {
      const imagens = imgsContainer.querySelectorAll("img");

      imagens.forEach((_, index) => {
          const span = document.createElement("span");
          span.style.height = "100%";
          span.style.width = "12px";
          span.style.backgroundColor = "rgb(159, 159, 159)";
          span.style.borderRadius = "50%";        
          paginationContainer.appendChild(span);
      });
  }
}
desenharSpans();

const spans_anun = [...document.querySelectorAll('#pagination>span')];
let span_meio = Math.ceil((spans_anun.length)/2);
spans_anun[span_meio].classList.add("atual");
if(anun_visible==3){
  spans_anun[span_meio-1].classList.add("atual");
  spans_anun[span_meio+1].classList.add("atual");
}

//limites de rolagem para seções
const secoes = document.getElementById('for_sections');
let fim_sections = 0;
  function obterLimites2(){
    const part_sections = document.getElementById('part_sections');
    const style_sections = getComputedStyle(secoes);
    let gap = parseFloat(style_sections.gap);
    let width_sections = 1200 + (gap * 11)+5;
    let larg_partSections = part_sections.offsetWidth;
    fim_sections = -(width_sections - larg_partSections);
    if (window.innerWidth >= 1373) fim_sections=0;
  }
  obterLimites2();
  
//limites de rolagem para produtos
const promos= document.getElementById('promos')
let fim_promos = 0;
  function obterLimites3(){
    let larg_for_promos = promos.offsetWidth;
    let gap_parte = parseFloat(getComputedStyle(document.getElementById('parteUm')).getPropertyValue('gap'));
    let quant_part = [...document.querySelectorAll('#parteUm > div')].length;
    let larg_prod = document.querySelector('.for_prod').offsetWidth;
    let larg_part = quant_part * larg_prod + gap_parte*(quant_part-1);
    let margin_for_promos = parseFloat(getComputedStyle(document.getElementById('for_promos')).getPropertyValue('margin-left'));
    fim_promos = larg_for_promos - larg_part - (margin_for_promos);
    if (window.innerWidth >= 1373){fim_promos+=26;}
  }
  obterLimites3();

//variaveis para anuncio
let limi1 = { 
  div: imgs_anun, arraste: meio, limite: fim_anun, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false
};
//variaveis para secoes e produtos
let limi = [
  { div: secoes, arraste: 0, limite: fim_sections, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: promos, arraste: 0, limite: fim_promos, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false }
];

limi.forEach((el, index) => {
  el.div.addEventListener('touchstart', (e) => iniciarArraste(e, index),{ passive: false });
  el.div.addEventListener('mousedown', (e) => iniciarArraste(e, index),{ passive: false });
  el.div.addEventListener('touchmove', (e) => aoMover(e, index),{ passive: false });
  el.div.addEventListener('mousemove', (e) => aoMover(e, index),{ passive: false });
  el.div.addEventListener('touchend', (e) => finalizarArraste(e, index));
  el.div.addEventListener('mouseup', (e) => finalizarArraste(e, index));
});

//para rolagem da pagina
let initialY = null;
let initialX = null;
let diffX=null;
let diffY=null;
let firstAngle = null;
let firstDiffX = null;
let firstDiffY = null;
let dragY= null;
let tempoDecorrido = 0;
let startTime = null; let speed = 0; let deltaY = null;
const minSpeed = 0.7;
const maxSpeed = 2.0;

const larg_img = document.querySelector('#imgs_anun img').offsetWidth;

function atualizarPaginacao() {
  const imagens = [...document.querySelectorAll("#imgs_anun img")];
  const paginacao = document.querySelectorAll("#pagination span");

  const indicesVisiveis = [];

  imagens.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      const larguraVisivel = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
      const porcentagemVisivel = (larguraVisivel / larg_img) * 100;
  
      if (porcentagemVisivel >= 66) {
          indicesVisiveis.push(index);
      }
  });

  paginacao.forEach(span => span.classList.remove("atual"));
  indicesVisiveis.forEach((i) => {
    paginacao[i].classList.add("atual");
  });

}

// Início do arraste em anuncios
const iniciarArraste1 = (e) => {
  e.preventDefault();
  const posicaoX = e.touches ? e.touches[0].clientX : e.clientX;
  //pagina
  initialY =  e.touches ? e.touches[0].clientY : e.clientY;
  initialX =  e.touches ? e.touches[0].clientX : e.clientX;
  speed = 0;
  deltaY = 0;
  startTime = Date.now();

  //divs
  limi1.toc_ini = posicaoX - limi1.arraste; //divs
  limi1.time_touch = Date.now();
  limi1.arrastando = true;
  if (limi1.animacaoRolagem) {
    cancelAnimationFrame(limi1.animacaoRolagem);
    limi1.animacaoRolagem = null;
  }
};
// Movimento do arraste em anuncios
const aoMover1 = (e) => {
  if(!limi1.arrastando) return;
  const tempoAtual = Date.now();
  tempoDecorrido = Math.max(1, tempoAtual - limi1.time_touch);

  const posicaoX = e.touches ? (e.touches[0] ? e.touches[0].clientX : null) : e.clientX;
  const currentY = e.touches ? (e.touches[0] ? e.touches[0].clientY : null) : e.clientY;

  if (posicaoX === null || currentY === null) return;
  diffX = Math.abs(posicaoX - initialX);
  diffY = Math.abs(currentY - initialY);

  //Ignore tiny drags
  const limiar = 1;
  if (diffX < limiar && diffY < limiar) return;
  //Calc angle
  if (firstDiffX === null && firstDiffY === null) {
    firstDiffX = diffX;
    firstDiffY = diffY;
    firstAngle = Math.atan2(diffY, diffX) * (180 / Math.PI);
    if (firstAngle === null) firstAngle = 0;
  }

  //Divs drag
  if (firstAngle < 45) {
    dragY= false;
    if (tempoDecorrido > 0) {
      limi1.velocidade = (posicaoX - limi1.toc_ini2) / tempoDecorrido; // px/ms
    }
    limi1.time_touch = tempoAtual;
    limi1.toc_ini2 = posicaoX;
    limi1.arraste = posicaoX - limi1.toc_ini;
    aplicarLimites1();
    imgs_anun.style.transform = `translateX(${limi1.arraste}px)`;

    initialX = posicaoX;
  }
  //Page drag
  if(firstAngle > 60 && window.innerWidth < 993){
    deltaY = currentY - initialY;
    if (tempoDecorrido > 0) {
      speed = deltaY / tempoDecorrido;
      speed = Math.sign(speed) * Math.max(minSpeed, Math.min(Math.abs(speed), maxSpeed));
    }
    window.scrollBy(0, -deltaY);
    initialY = currentY;
    startTime = tempoAtual;
    dragY = true;
  }
  else{dragY=null};
};

// Finalizar arraste e iniciar desaceleração em anuncios
const finalizarArraste1 = (e) => {
  if(!dragY){
   if (!limi1.arrastando) return;
    limi1.arrastando = false;
    const desacelerar = () => {
      if (Math.abs(limi1.velocidade) > 0.01) {
        limi1.velocidade *= 0.95;
        limi1.arraste += limi1.velocidade * 16;
        // Aplicar limites
        aplicarLimites1();
        imgs_anun.style.transform = `translateX(${limi1.arraste}px)`;

        if (Math.abs(limi1.velocidade) < 0.6) {
          atualizarPaginacao();
        }

        limi1.animacaoRolagem = requestAnimationFrame(desacelerar);
      } else {
        limi1.animacaoRolagem = null;
        atualizarPaginacao();
      }
    };
    desacelerar();
  }

  if (dragY) {
    if (Math.abs(speed) < minSpeed) {
      speed = minSpeed * Math.sign(speed); // Garante movimento mínimo
    }

    if (!Number.isFinite(speed)) speed = minSpeed * Math.sign(deltaY);
    
    startMomentumScroll();
  }

  initialY = null; initialX = null; 
  firstAngle = null; firstDiffX = null; 
  firstDiffY = null;
  dragY=null;
};

function startMomentumScroll() {
  const decay = 0.95;
  const step = () => {
    if (Math.abs(speed) > 0.1) {
      speed *= decay;
      window.scrollBy(0, -speed * 16);
      requestAnimationFrame(step);
    }
    //removi o else daqui
  };
  requestAnimationFrame(step);
}
const aplicarLimites1 = (i) => {
  if (limi1.arraste < limi1.limite) {
    limi1.arraste = limi1.limite;
    limi1.velocidade = 0;
  }
  if (limi1.arraste > 0) {
    limi1.arraste = 0;
    limi1.velocidade = 0;
  }
};

// Adiciona event listeners 
limi1.div.addEventListener('touchstart',  iniciarArraste1,{ passive: false });
limi1.div.addEventListener('mousedown', iniciarArraste1,{ passive: false });
limi1.div.addEventListener('touchmove', aoMover1,{ passive: false });
limi1.div.addEventListener('mousemove', aoMover1,{ passive: false });
limi1.div.addEventListener('touchend', finalizarArraste1);
limi1.div.addEventListener('mouseup', finalizarArraste1);

//Arraste para secoes e promocoes
const iniciarArraste = (e, i) => {
  
  e.preventDefault();
  const posicaoX = e.touches ? e.touches[0].clientX : e.clientX;
  //pagina
  initialY =  e.touches ? e.touches[0].clientY : e.clientY;
  initialX =  e.touches ? e.touches[0].clientX : e.clientX;
  speed = 0;
  deltaY = 0;
  startTime = Date.now();

  //divs
  limi[i].toc_ini = posicaoX - limi[i].arraste; //divs
  limi[i].time_touch = Date.now();
  limi[i].arrastando = true;
  if (limi[i].animacaoRolagem) {
    cancelAnimationFrame(limi[i].animacaoRolagem);
    limi[i].animacaoRolagem = null;
  }
};
// Movimento
const aoMover = (e, i) => {
  if(!limi[i].arrastando) return;
  const tempoAtual = Date.now();
  tempoDecorrido = Math.max(1, tempoAtual - limi[i].time_touch);

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
    if (firstAngle === null) firstAngle = 0;
  }
  //divs
  if (firstAngle < 45) {
    dragY= false;
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
  //pagina
  if(firstAngle > 60 && window.innerWidth < 993){
    deltaY = currentY - initialY;
    if (tempoDecorrido > 0) {
      speed = deltaY / tempoDecorrido;
      speed = Math.sign(speed) * Math.max(minSpeed, Math.min(Math.abs(speed), maxSpeed));
    }
    window.scrollBy(0, -deltaY);
    initialY = currentY;
    startTime = tempoAtual;
    dragY = true;
  }
  else{dragY=null};
};
// Finalizar arraste e iniciar desaceleração
const finalizarArraste = (e, i) => {
  if(!dragY){
    if (!limi[i].arrastando) return;
    limi[i].arrastando = false;
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
  
  if (dragY) {
    if (Math.abs(speed) < minSpeed) {
      speed = minSpeed * Math.sign(speed); // Garante movimento mínimo
    }

    if (!Number.isFinite(speed)) speed = minSpeed * Math.sign(deltaY);
    
    startMomentumScroll();
  }

  initialY = null; initialX = null; 
  firstAngle = null; firstDiffX = null; 
  firstDiffY = null;
  dragY=null;
};

function startMomentumScroll() {
  const decay = 0.95;
  const step = () => {
    if (Math.abs(speed) > 0.1) {
      speed *= decay;
      window.scrollBy(0, -speed * 16);
      requestAnimationFrame(step);
    }
    //removi o else daqui
  };
  requestAnimationFrame(step);
}
// Função para aplicar limites
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

//Rolagem com touchPad
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

};



    

  