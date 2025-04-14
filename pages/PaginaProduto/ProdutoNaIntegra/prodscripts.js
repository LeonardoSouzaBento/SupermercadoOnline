window.onload = function(){
    function AlturaSecoes(){
        const prod_section = document.getElementById('prod_section')
        const height = prod_section.offsetHeight;

        if(window.innerWidth >= 577){
        const similares = document.getElementById('similares_section');
        similares.style.maxHeight = `${height}px`;
        }
    }
    AlturaSecoes();
}