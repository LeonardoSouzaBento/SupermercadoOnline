window.onload = function(){
    const mais_quant = document.querySelector('.mais_quant');
    const div_filha = document.querySelector('.mais_quant>div');
    let ajuste = -(mais_quant.clientWidth - div_filha.scrollWidth);
    div_filha.style.transform = `translateX(${ajuste}px)`;
}