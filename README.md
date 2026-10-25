# Site de Redirecionamento — Pai Bruno de Ogum

Landing page estática pronta para deploy na Vercel. Foco total em converter visitantes em pré-consultas gratuitas no WhatsApp.

## ✅ Arquivos já configurados
- `index.html` → nome, bio, título e depoimentos já preenchidos
- `style.css` → design responsivo e profissional
- `script.js` → número do WhatsApp e links dos depoimentos já configurados

## 📸 Fotos necessárias na pasta `public/`
- `fotoPerfil.png` (sua foto)
- `d1.png`, `d2.png`, `d3.png`, `d4.png` (depoimentos)

## 🚀 Deploy na Vercel (método GitHub — recomendado)

1. Crie um repositório novo no GitHub (pode ser privado)
2. Suba todos os arquivos mantendo a estrutura (incluindo a pasta `public/`)
3. Acesse https://vercel.com → **Add New → Project**
4. Autorize o GitHub e selecione seu repositório
5. Clique em **Deploy** (não altere nada — a Vercel detecta site estático automaticamente)
6. Pronto! Sua URL `seu-projeto.vercel.app` está no ar

Para atualizar depois: basta subir alterações no GitHub que a Vercel republica sozinha.

## 🔒 Proteção do WhatsApp
- O botão usa `https://wa.me/SEUNUMERO` (formato oficial que esconde o número de robôs)
- A mensagem pré-preenchida já qualifica o lead
- Depoimentos apenas em imagem (sem texto extraído por robôs)