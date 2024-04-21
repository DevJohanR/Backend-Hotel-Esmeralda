const { user_reservations } = require('../db');
const Stripe = require('stripe');
const bodyParser = require('body-parser');


const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Configurar middleware para analizar el cuerpo de la solicitud como una cadena sin procesar
const rawBodyParser = bodyParser.raw({ type: '*/*' });

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Parsear el cuerpo de la solicitud como una cadena sin procesar
    await rawBodyParser(req, res);
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      // Buscar la reserva correspondiente y actualizar su estado
      const reservation = await user_reservations.findOne({ where: { stripe_session_id: session.id } });
      if (reservation) {
        reservation.status = 'pay';
        await reservation.save();
        console.log('Reservation status updated to pay');
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
      return res.status(500).json({ message: 'Error updating reservation status' });
    }
  }

  res.json({ received: true });
};

module.exports = { handleStripeWebhook };
