// ============================================================
//  CONFIGURAÇÃO — JÁ PREENCHIDO COM SEUS DADOS
// ============================================================

// Número do WhatsApp (DDD 41 + número)
const WHATSAPP_NUMBER = "554195800788";

// Mensagem que já vem pré-preenchida quando a pessoa clica no botão
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

// Depoimentos — apenas as imagens, sem texto ou nomes (como você pediu)
const TESTIMONIALS = [
    { photo: "/public/d1.png" },
    { photo: "/public/d2.png" },
    { photo: "/public/d3.png" },
    { photo: "/public/d4.png" }
];

// ============================================================
//  FIM DA CONFIGURAÇÃO — não precisa mexer abaixo
// ============================================================

// Monta o link do WhatsApp
const whatsappBtn = document.getElementById("whatsapp-btn");
if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
}

// Renderiza os depoimentos apenas como imagens
const grid = document.getElementById("testimonials-grid");
if (grid && Array.isArray(TESTIMONIALS)) {
    grid.innerHTML = TESTIMONIALS.map(t => {
        return `
            <img src="${t.photo}" alt="Depoimento de cliente" class="testimonial-img" loading="lazy" onerror="this.style.display='none'">
        `;
    }).join("");
}

// Ano atual no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();