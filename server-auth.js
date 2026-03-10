/**
 * --- SERVER CODE ---
 * 
 * Este código debe ejecutarse en tu servidor backend (Node.js).
 * Para que funcione, debes instalar la librería jsonwebtoken:
 * npm install jsonwebtoken
 */

const jwt = require('jsonwebtoken');

// Tu clave secreta de Chatbase (debe guardarse como variable de entorno, no en el código)
const secret = process.env.CHATBOT_IDENTITY_SECRET; 

/**
 * Función de ejemplo para generar el token de identidad.
 * Debes integrarla con tu sistema de autenticación.
 */
async function generateChatbaseToken(user) {
    if (!user) return null;

    const token = jwt.sign(
        { 
            user_id: user.id, // ID único de tu usuario
            email: user.email, // Email del usuario
            stripe_accounts: user.stripe_accounts, // Opcional: para integración con Stripe
            // ... otros atributos personalizados que quieras pasar a Chatbase
        }, 
        secret, 
        { expiresIn: '1h' }
    );

    return token;
}

// Ejemplo de uso en un endpoint de API (Express):
/*
app.get('/api/chatbase-token', async (req, res) => {
    const user = await getSignedInUser(req); // Obtener usuario de la sesión
    if (!user) return res.status(401).send('No autorizado');
    
    const token = await generateChatbaseToken(user);
    res.json({ token });
});
*/
