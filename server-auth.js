// --- SERVER CODE ---
const jwt = require('jsonwebtoken');

const secret = process.env.CHATBOT_IDENTITY_SECRET; // Your chatbase secret key (should be stored as a secret not in the code)

// Esta es una función de ejemplo, debes adaptarla a tu sistema de autenticación
async function handleChatbaseToken(req) {
    const user = await getSignedInUser(req); // Get the current user signed in to your site

    const token = jwt.sign(
        {
            user_id: user.id, // Your user's id
            email: user.email, // User's email
            stripe_accounts: user.stripe_accounts, // User's stripe accounts for stripe integration
            // ... other custom attributes
        },
        secret,
        { expiresIn: '1h' }
    );

    return token;
}
