/*
document.addEventListener("DOMContentLoaded", () => {
    let icones = [...document.querySelectorAll("#for_sections div img")];
    console.log(icones); // Verifique se o array contém elementos
});
*/

requestAnimationFrame(() => {
    let icones = [...document.querySelectorAll("#for_sections div img")];
    console.log(icones);

    let srcs= [...(icones.map(el => el.src))]
    console.log(srcs)
});
