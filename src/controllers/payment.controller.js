
// Cambia la importación de Stripe a CommonJS
const Stripe = require('stripe');
// Importa la clave privada de Stripe desde tu archivo de configuración usando CommonJS

// Crea una instancia de Stripe con tu clave privada
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Define la función createSession y expórtala usando module.exports
const createCheckoutSession = async (req, res) => {
  const { items, userId } = req.body; // Asumamos que también recibimos userId para personalizar las URLs de redirección

  // Convertir los productos recibidos a line_items para Stripe
  const lineItems = items.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  try {
    // Los parámetros que quieras pasar, por ejemplo, el ID de usuario
    const queryParams = new URLSearchParams({ userId }).toString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:4000/success?${queryParams}`, // Incluye los parámetros en la URL
      cancel_url: `http://localhost:4000/cancel?${queryParams}`,
    });

    // Enviar la URL de la sesión de pago de Stripe
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: error.message });
  }
};
module.exports = { createCheckoutSession };

