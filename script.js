const WHATSAPP_NUMBER = "554195800788";
const WHATSAPP_MESSAGE = "Olá, Pai Bruno! Vim pelo seu site e gostaria de agendar minha pré-consulta gratuita.";

const TESTIMONIALS = [
    { photo: "d1.png" },
    { photo: "d2.png" },
    { photo: "d3.png" },
    { photo: "d4.png" }
];

const whatsappBtns = document.querySelectorAll("#whatsapp-btn, .whatsapp-click");
if (whatsappBtns.length > 0) {
    const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
    whatsappBtns.forEach(btn => {
        btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
        
        btn.addEventListener("click", function() {
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
            }).catch(error => console.error('Erro na API:', error));
        });
    });
}

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

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
