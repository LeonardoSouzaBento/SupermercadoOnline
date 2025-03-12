const imgs_anun = document.getElementById('imgs_anun');
let larg_anuncio = document.getElementById('anuncio').offsetWidth;
let gap_imgs_anuncio = parseFloat(getComputedStyle(document.getElementById('imgs_anun')).getPropertyValue('gap'));
let quant_anun = [...document.querySelectorAll('#imgs_anun>img')].length;
let larg_img = document.querySelector('#imgs_anun>img').offsetWidth;
let larg_imgs_anun = gap_imgs_anuncio *(quant_anun-1) + larg_img * quant_anun +2;
let meio = larg_anuncio/2 - larg_imgs_anun/2;
let fim_anun = larg_anuncio - larg_imgs_anun;

imgs_anun.style.transform = `translateX(${meio}px)`;

imgs_anun.addEventListener("click", function (event) {
  const rect = imgs_anun.getBoundingClientRect(); // Obtém a posição e tamanho da div
  //30px das bordas sensiveis
  const limiteEsquerda = rect.left + 40;
  const limiteDireita = rect.right - 40;
  const touchX = event.clientX; // Captura a posição X do toque

  if (touchX <= limiteEsquerda) {
    console.log("Toque na borda esquerda");
  } else if (touchX >= limiteDireita) {
    console.log("Toque na borda direita");
  } else {
    console.log("Toque dentro da área central");
  }
});

// let startY, startX, startTime, isScrolling = false, speed = 0, deltaY = 0, deltaY2=0, deltaX=0, angle=0;
// const minSpeed = 0.7;
// const maxSpeed = 2.0;

// // Iniciar toque
// document.addEventListener('touchstart', (e) => {
//   startY = e.touches[0].clientY;
//   startX = e.touches[0].clientX;
//   startTime = Date.now();
//   isScrolling = false;
//   speed = 0;
//   deltaY = 0;
// }, { passive: true });

// // Mover
// document.addEventListener('touchmove', (e) => {
//   e.preventDefault();
//   const currentY = e.touches[0].clientY;
//   const currentX = e.touches[0].clientX;
//   const currentTime = Date.now();
//   const deltaTime = currentTime - startTime;
//   deltaY = currentY - startY;

//   let all_deltaY= Math.abs(currentY - startY);
//   let all_deltaX= Math.abs(currentX - startX);

//   const limiar = 1;
//   if (all_deltaX < limiar && all_deltaY < limiar) return;

//   if(deltaY2==0 && deltaX==0){
//     deltaY2= all_deltaY;
//     deltaX= all_deltaX;
//     angle = Math.atan2(deltaY2, deltaX) * (180 / Math.PI);
//   }
//   if(angle > 60){
//     if (deltaTime > 0) {
//       speed = deltaY / deltaTime;
//       speed = Math.sign(speed) * Math.max(minSpeed, Math.min(Math.abs(speed), maxSpeed));
//     }
//     window.scrollBy(0, -deltaY);
//     startY = currentY;
//     startTime = currentTime;
//     isScrolling = true;
//   }
// }, { passive: false });

// // Finalizar
// document.addEventListener('touchend', () => {
//   if (isScrolling) {
//     if (Math.abs(speed) < minSpeed) {
//       speed = minSpeed * Math.sign(speed); // Garante movimento mínimo
//     }
//     startMomentumScroll();
//   }
//   deltaY2=0; deltaX=0; angle=0;
// });

// function startMomentumScroll() {
//   const decay = 0.95; // Redução gradual da velocidade
//   const step = () => {
//     if (Math.abs(speed) > 0.1) { // Evita paradas bruscas
//       speed *= decay;
//       window.scrollBy(0, -speed * 16);
//       requestAnimationFrame(step);
//     } else {
//       isScrolling = false;
//     }
//   };
//   requestAnimationFrame(step);
// };