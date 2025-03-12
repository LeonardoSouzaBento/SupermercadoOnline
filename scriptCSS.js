// Função para gerar o hash de um arquivo
async function generateFileHash(url) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Função para atualizar os scripts
async function updateScripts() {
    const scripts = document.querySelectorAll('script[src]');
    for (const script of scripts) {
        const url = script.getAttribute('src');
        const hash = await generateFileHash(url);
        const newScript = document.createElement('script');
        newScript.src = `${url}?v=${hash}`;
        newScript.async = true; // Mantém o carregamento assíncrono
        script.replaceWith(newScript); // Substitui o script antigo pelo novo
    }
}

// Verifica suporte a crypto.subtle e executa o código
if (window.crypto && crypto.subtle) {
    window.onload = function() {
        // Usa requestIdleCallback se disponível, caso contrário, executa imediatamente
        if (window.requestIdleCallback) {
            requestIdleCallback(() => {
                updateScripts();
            });
        } else {
            updateScripts();
        }
    };
}

/*
async function updateLinks() {
    const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
    for (const link of cssFiles) {
        const url = link.getAttribute('href');
        const hash = await generateFileHash(url);
        link.setAttribute('href', `${url}?v=${hash}`);
    }
}*/
