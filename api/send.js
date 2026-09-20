const axios = require('axios');

// C'est ici que Vercel va chercher tes clés (API Keys)
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { phoneNumber, message } = req.body;

    // Envoi du message WhatsApp
    const response = await axios({
      method: 'post',
      url: `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      }
    });

    res.status(200).json({ message: "WhatsApp envoyé avec succès !", data: response.data });

  } catch (error) {
    console.error("Erreur d'envoi:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Impossible d'envoyer le WhatsApp", details: error.message });
  }
}
