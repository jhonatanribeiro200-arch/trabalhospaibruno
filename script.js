// ============================================================
// CONFIGURAÇÕES DO SITE
// ============================================================
const WHATSAPP_NUMBER = "5521968506455";
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

// ============================================================
// BOTÃO DO WHATSAPP E RASTREAMENTO AUTOMÁTICO (APENAS PIXEL)
// ============================================================
const whatsappBtn = document.getElementById("whatsapp-btn");

if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    
    whatsappBtn.addEventListener("click", function(e) {
        // Dispara o Pixel no Navegador (Evento Purchase para Vendas)
        if (typeof fbq === 'function') {
            fbq('track', 'Purchase');
        }
        
        // O link abre normalmente (não precisamos mais do preventDefault e nem do setTimeout)
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
