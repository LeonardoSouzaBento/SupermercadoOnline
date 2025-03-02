//Arraste das seções
window.onload = function(){
//Troca de icones
let icones = [...document.querySelectorAll("#for_sections div img")];
let srcs= [...(icones.map(el => el.src))]

//Rolagem das seções
let part_sections = document.getElementById('part_sections');
let secoes = document.getElementById('for_sections');

const style_sections = getComputedStyle(secoes);
let gap = parseFloat(style_sections.gap);
let width_sections = 1200 + (gap * 12);

let larg_partSections = part_sections.offsetWidth;
let limite = -(width_sections - larg_partSections);

let toc_ini = 0;
let arraste = 0;
let toc_ini2 = 0;
let time_touch = 0;
let velocidade = 0;
let animacaoRolagem = null;
let arrastando = false;

// Rolagem com dedo e mouse
// Início do arraste
const iniciarArraste = (e) => {
  e.preventDefault();
  const toques = e.touches ? e.touches[0].clientX : e.clientX;
  toc_ini = toques - arraste;
  toc_ini2 = toques;
  time_touch = Date.now();
  arrastando = true;

  if (animacaoRolagem) {
    cancelAnimationFrame(animacaoRolagem);
    animacaoRolagem = null;
  }
};
// Movimento do arraste
const aoMover = (e) => {
  e.preventDefault();
  if (!arrastando) return;

  const toques = e.touches ? e.touches[0].clientX : e.clientX;
  const actual_time = Date.now();

  // Calcula a velocidade do movimento
  const elapsed_time = actual_time - time_touch;
  if (elapsed_time > 0) {
    velocidade = (toques - toc_ini2) / elapsed_time; // px/ms
  }

  toc_ini2 = toques;
  time_touch = actual_time;
  arraste = toques - toc_ini;

  // Aplicar limites corretamente
  if (arraste < limite) arraste = limite;
  if (arraste > 0) arraste = 0;

  secoes.style.transform = `translateX(${arraste}px)`;
};
// Finalizar arraste e iniciar desaceleração
const finalizarArraste = () => {
  if (!arrastando) return;
  arrastando = false;

  const desacelerar = () => {
    if (Math.abs(velocidade) > 0.01) { // Valor mínimo para parar
      velocidade *= 0.95; // Reduz gradualmente a velocidade
      arraste += velocidade * 16; // Multiplica pela estimativa de 16ms/frame

      // Aplicar limites corretamente
      if (arraste < limite) {
        arraste = limite;
        velocidade = 0;
      }
      if (arraste > 0) {
        arraste = 0;
        velocidade = 0;
      }

      secoes.style.transform = `translateX(${arraste}px)`;
      animacaoRolagem = requestAnimationFrame(desacelerar);
    } else {
      animacaoRolagem = null; // Finaliza a animação
    }
  };
  desacelerar();
};


secoes.addEventListener('mousedown', iniciarArraste);
secoes.addEventListener('mousemove', aoMover);
secoes.addEventListener('mouseup', finalizarArraste);
secoes.addEventListener('mouseleave', finalizarArraste);

secoes.addEventListener('touchstart', iniciarArraste);
secoes.addEventListener('touchmove', aoMover);
secoes.addEventListener('touchend', finalizarArraste);



};




//Função de troca de icones
/*
document.addEventListener("DOMContentLoaded", () => {
    let icones = [...document.querySelectorAll("#for_sections div img")];
    console.log(icones); // Verifique se o array contém elementos
});
*/