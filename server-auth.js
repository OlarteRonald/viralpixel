/**
 * --- SERVER CODE COMPLETO (Node.js + Express) ---
 * 
 * Este código debe residir en tu backend.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secret = process.env.CHATBOT_IDENTITY_SECRET;

// Endpoint para entregar el token al cliente
app.get('/api/get-chatbase-token', async (req, res) => {
    try {
        // 1. Obtener el usuario de la sesión actual
        // const user = await getSignedInUser(req); 

        // Simulación de usuario para el ejemplo
        const user = {
            id: 'user_12345',
            email: 'usuario@ejemplo.com',
            stripe_accounts: []
        };

        if (!user) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        // 2. Firmar el token con la secret key de Chatbase
        const token = jwt.sign(
            {
                user_id: user.id,
                email: user.email,
                stripe_accounts: user.stripe_accounts,
            },
            secret,
            { expiresIn: '1h' }
        );

        // 3. Enviar el token al frontend
        res.json({ token });
    } catch (error) {
        console.error("Error generando token:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.listen(3000);
