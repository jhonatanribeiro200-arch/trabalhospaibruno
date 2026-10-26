const WHATSAPP_NUMBER = "554195800788";
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

// Monta o link do WhatsApp e configura o rastreamento
const whatsappBtn = document.getElementById("whatsapp-btn");
if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    
    whatsappBtn.addEventListener("click", function(e) {
        // Impede o redirecionamento imediato
        e.preventDefault(); 
        const urlWhatsApp = this.href;

        // 1. Dispara o Pixel no Navegador
        if (typeof fbq === 'function') {
            fbq('track', 'Contact');
        }

        // 2. Dispara a API de Conversões na Vercel
        fetch('/api/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: 'Contact',
                eventData: { content_name: 'Clique no WhatsApp' }
            })
        })
        .then(() => {
            window.location.href = urlWhatsApp; // Redireciona após a API responder
        })
        .catch((error) => {
            console.error('Erro na API:', error);
            window.location.href = urlWhatsApp; // Redireciona mesmo se a API falhar
        });

        // Segurança: se a API demorar, redireciona em 0.6s
        setTimeout(() => {
            window.location.href = urlWhatsApp;
        }, 600);
    });
}

// Renderiza o Carrossel
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

// Ano no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
