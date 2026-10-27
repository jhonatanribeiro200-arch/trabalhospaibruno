// ============================================================
// CONFIGURAÇÕES DO SITE
// ============================================================
const WHATSAPP_NUMBER = "554195800788"; // Número DDD 41 restaurado
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

// ============================================================
// BOTÃO DO WHATSAPP E RASTREAMENTO (APENAS PIXEL DO NAVEGADOR)
// ============================================================
const whatsappBtn = document.getElementById("whatsapp-btn");

if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    
    whatsappBtn.addEventListener("click", function() {
        // Dispara o evento Purchase apenas pelo navegador (sem API)
        if (typeof fbq === 'function') {
            fbq('track', 'Purchase');
        }
    });
}

// ============================================================
// CARROSSEL DE DEPOIMENTOS (SWIPER)
// ============================================================
const grid = document.getElementById("testimonials-grid");

if (grid && Array.isArray(TESTIMONIALS)) {
    grid.innerHTML = TESTIMONIALS.map(t => `
        <div class="swiper-slide">
            <img src="${t.photo}" alt="Depoimento" class="testimonial-img" loading="lazy" onerror="this.style.display='none'">
        </div>
    `).join("");
}

if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
        loop: true, 
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        speed: 800, 
    });
}

// ============================================================
// ANO ATUAL NO RODAPÉ
// ============================================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
