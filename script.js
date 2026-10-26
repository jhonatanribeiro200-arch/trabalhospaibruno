// ============================================================
// CONFIGURAÇÕES DO SITE
// ============================================================
const WHATSAPP_NUMBER = "554195800788";
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

// ============================================================
// BOTÃO DO WHATSAPP E RASTREAMENTO (PIXEL + API)
// ============================================================
const whatsappBtn = document.getElementById("whatsapp-btn");

if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    
    whatsappBtn.addEventListener("click", function(e) {
        // Impede o navegador de pular para o WhatsApp imediatamente
        e.preventDefault(); 
        const urlWhatsApp = this.href;

        // 1. Dispara o Pixel no Navegador
        if (typeof fbq === 'function') {
            fbq('track', 'Contact');
        }

        // 2. Dispara a API de Conversões na Vercel (Servidor)
        fetch('/api/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: 'Contact',
                eventData: { content_name: 'Clique no WhatsApp' }
            }),
            keepalive: true // Garante que o envio não seja cancelado ao redirecionar
        })
        .then(() => {
            window.location.href = urlWhatsApp; 
        })
        .catch((error) => {
            console.error('Erro na API:', error);
            window.location.href = urlWhatsApp; 
        });

        // Segurança: se a API ou o Pixel demorarem, redireciona em 0.6s
        setTimeout(() => {
            window.location.href = urlWhatsApp;
        }, 600);
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
        autoplay: { 
            delay: 3000, 
            disableOnInteraction: false 
        },
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true 
        },
        speed: 800, 
    });
}

// ============================================================
// ANO ATUAL NO RODAPÉ
// ============================================================
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
