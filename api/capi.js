export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método não permitido' });
    }

    const { eventName, eventData } = request.body;
    const PIXEL_ID = '3771039406390855'; 
    const ACCESS_TOKEN = 'EAApvgRXwdGUBS97hrDhBxq2J7A5HB8Xj1wBAeXfJ3mPPRU2GIOJ4RPU77zPPqb6oNM4O0idCeRlJaA01qNbhYjmZAg7JGYuBZB0C9EPWKrttK3bAGBaazNg7A4MywZCIfHdZBSmGi9s3zz6erYNg3iyRXMCZAAfL3c8FPGgP5EwJJHtffEzSnqSPPZAjtMiQZDZD';

    const payload = {
        data: [
            {
                event_name: eventName || 'Contact',
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                event_source_url: 'https://trabalhospaibruno.vercel.app',
                user_data: {
                    client_ip_address: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
                    client_user_agent: request.headers['user-agent'],
                },
                custom_data: eventData || {},
            },
        ],
        access_token: ACCESS_TOKEN,
    };

    try {
        const metaResponse = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const metaData = await metaResponse.json();
        
        // Se houver erro no Facebook, ele vai aparecer no log da Vercel
        if (metaData.error) {
            console.error('Erro retornado pela Meta:', metaData.error);
            return response.status(400).json({ error: metaData.error });
        }

        return response.status(200).json({ success: true, metaData });

    } catch (error) {
        console.error('Erro ao enviar evento para a Meta:', error);
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }
}
