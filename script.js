// ============================================================
//  CONFIGURAÇÃO — JÁ PREENCHIDO COM SEUS DADOS
// ============================================================

const WHATSAPP_NUMBER = "554195800788";
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

// Apenas as imagens, sem a pasta /public/
const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

// ============================================================
//  FIM DA CONFIGURAÇÃO
// ============================================================

// Monta o link do WhatsApp
const whatsappBtn = document.getElementById("whatsapp-btn");
if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
}

// Renderiza as imagens no carrossel
const grid = document.getElementById("testimonials-grid");
if (grid && Array.isArray(TESTIMONIALS)) {
    grid.innerHTML = TESTIMONIALS.map(t => {
        return `
            <div class="swiper-slide">
                <img src="${t.photo}" alt="Depoimento de cliente" class="testimonial-img" loading="lazy" onerror="this.style.display='none'">
            </div>
        `;
    }).join("");
}

// Inicializa o Carrossel Automático (Looping infinito)
if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
        loop: true, // Ativa o looping infinito
        autoplay: {
            delay: 3000, // Tempo de 3 segundos para trocar a foto
            disableOnInteraction: false, // Continua rodando mesmo se o usuário interagir
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Bolinhas clicáveis
        },
        effect: 'slide', // Efeito de deslizar
        speed: 800, // Velocidade da transição
    });
}

// Ano atual no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();