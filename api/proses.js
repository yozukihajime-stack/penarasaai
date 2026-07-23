export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text } = req.body;

    // Vercel akan membaca API Key dari brankas rahasia (Environment Variables)
    const apiKey = process.env.GEMINI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const promptPenaRasa = `Bertindaklah sebagai editor novel profesional. Sunting tata bahasa, diksi, dan kealamian prosa dari naskah berikut tanpa menghilangkan gaya orisinal penulis:\n\n${text}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptPenaRasa }] }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghubungi AI' });
    }
}
