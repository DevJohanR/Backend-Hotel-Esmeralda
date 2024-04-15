const Stripe = require('stripe');
// Importa la clave privada de Stripe desde tu archivo de configuración usando CommonJS

// Crea una instancia de Stripe con tu clave privada
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
// Controlador para manejar los webhooks de Stripe
const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Construye el evento usando la librería de Stripe
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        // Responde al servidor de Stripe indicando que hubo un error al procesar el webhook
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Maneja los eventos específicos
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // Aquí es donde manejarías el pago aprobado
        console.log('Pago exitoso para la sesión:', session.id);
        
        // Aquí puedes agregar lógica para actualizar tu base de datos
        // Por ejemplo, actualizar el estado de una reserva a 'completada'

        // Responde a Stripe indicando que el evento fue procesado correctamente
        res.json({received: true});
    } else {
        // Responde que recibiste el evento, pero no necesitas hacer nada con él
        res.json({received: true});
    }
};

module.exports = { stripeWebhookHandler };
