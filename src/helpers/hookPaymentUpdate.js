const { user_reservations } = require('../db');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const handleStripeWebhook = async (req, res) => {
  console.log('Webhook received');
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    console.log('Constructing event...');
    // Convertir el cuerpo de la solicitud a una cadena si es un objeto
    const requestBody = typeof req.body === 'object' && !Buffer.isBuffer(req.body) ? JSON.stringify(req.body) : req.body;
    event = stripe.webhooks.constructEvent(requestBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('Event constructed:', event);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Checkout session completed');
    
    const session = event.data.object;
    try {
      console.log('Finding reservation...');
      const reservation = await user_reservations.findOne({ where: { stripe_session_id: session.id } });
      console.log('Reservation found:', reservation);
      
      if (reservation) {
        console.log('Updating reservation status...');
        reservation.status = 'pay';
        await reservation.save();
        console.log('Reservation status updated to pay');
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
      return res.status(500).json({ message: 'Error updating reservation status' });
    }
  }

  console.log('Sending response to Stripe');
  // Enviar una respuesta al servidor de Stripe para confirmar la recepción del evento
  res.json({ received: true });
};

module.exports = { handleStripeWebhook };
