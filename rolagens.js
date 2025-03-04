let limi = [ 
  { div: imgs_anun, arraste: meio, limite: fim_anun, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: secoes, arraste: 0, limite: fim_sections, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false },
  { div: promos, arraste: 0, limite: fim_promos, toc_ini: 0, toc_ini2: 0, time_touch: 0, velocidade: 0, animacaoRolagem: null, arrastando: false }
];

  // Rolagem com dedo e mouse
  // Início do arraste
  const iniciarArraste = (e) => {
    let i = limi.findIndex(el => el.div === e.currentTarget);

    e.preventDefault();
    const toques = e.touches ? e.touches[0].clientX : e.clientX;

    limi[i].toc_ini = toques - limi[i].arraste;
    limi[i].toc_ini2 = toques;
    limi[i].time_touch = Date.now();
    limi[i].arrastando = true;
    if (limi[i].animacaoRolagem) {
      cancelAnimationFrame(limi[i].animacaoRolagem);
      limi[i].animacaoRolagem = null;
    }
  };
  // Movimento do arraste
  const aoMover = (e) => {
    let i = limi.findIndex(el => el.div === e.currentTarget);

    if (!limi[i].arrastando) return;
    if (window.innerWidth >= 1375) return;
  
    const toques = e.touches ? e.touches[0].clientX : e.clientX;
    const actual_time = Date.now();
  
    // Calcula a velocidade do movimento
    const elapsed_time = actual_time - limi[i].time_touch;
    if (elapsed_time > 0) {
      limi[i].velocidade = (toques - limi[i].toc_ini2) / elapsed_time; // px/ms
    }
  
    limi[i].toc_ini2 = toques;
    limi[i].time_touch = actual_time;
    limi[i].arraste = toques - limi[i].toc_ini;
  
    // Aplicar limites corretamente
    if (limi[i].arraste < limi[i].limite) limi[i].arraste = limi[i].limite;
    if (limi[i].arraste > 0) limi[i].arraste = 0;
  
    limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;
  };
  
  // Finalizar arraste e iniciar desaceleração
  const finalizarArraste = (e) => {
    let i = limi.findIndex(el => el.div === e.currentTarget);

    if (!limi[i].arrastando) return;
    limi[i].arrastando = false;
  
    const desacelerar = () => {
      if (Math.abs(limi[i].velocidade) > 0.01) { // Valor mínimo para parar
        limi[i].velocidade *= 0.95; // Reduz gradualmente a velocidade
        limi[i].arraste += limi[i].velocidade * 16; // Multiplica pela estimativa de 16ms/frame
  
        // Aplicar limites corretamente
        if (limi[i].arraste < limi[i].limite) {
          limi[i].arraste = limi[i].limite;
          limi[i].velocidade = 0;
        }
        if (limi[i].arraste > 0) {
          limi[i].arraste = 0;
          limi[i].velocidade = 0;
        }
        limi[i].div.style.transform = `translateX(${limi[i].arraste}px)`;
        limi[i].animacaoRolagem = requestAnimationFrame(desacelerar);
  
      } else {
        limi[i].animacaoRolagem = null; // Finaliza a animação
      }
    };
    desacelerar();
  };