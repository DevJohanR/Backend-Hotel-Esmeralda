
// Cambia la importación de Stripe a CommonJS
const Stripe = require('stripe');
// Importa la clave privada de Stripe desde tu archivo de configuración usando CommonJS

// Crea una instancia de Stripe con tu clave privada
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Define la función createSession y expórtala usando module.exports
const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        // agregar objeto con las reservas adquiridas (las 3 reservas)
        {
          price_data: {
            product_data: {
              name: "Laptop",
            },
            currency: "usd",
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "TV",
            },
            currency: "usd",
            unit_amount: 1000,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4000/api",
      cancel_url: "http://localhost:4000/api/dishes"

    });
//agregar condicional si el pago fue exitoso  cambiar el estado de reserva a confirmada y si no dejarla en pendiente
    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Exporta la función createSession usando CommonJS
module.exports = { createSession };
