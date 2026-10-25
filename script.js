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

// Monta o link do WhatsApp para todos os botões que tiverem a classe ou o id
const whatsappBtns = document.querySelectorAll("#whatsapp-btn, .whatsapp-click");
if (whatsappBtns.length > 0) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtns.forEach(btn => {
        btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
        
        // Rastreamento do Meta Pixel no clique do WhatsApp
        btn.addEventListener("click", function() {
            if (typeof fbq === 'function') {
                fbq('track', 'Contact');
            }
        });
    });
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
        loop: true, 
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false, 
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        effect: 'slide', 
        speed: 800, 
    });
}

// Ano atual no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
