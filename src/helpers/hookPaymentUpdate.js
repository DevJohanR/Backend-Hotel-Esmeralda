const { user_reservations } = require('../db');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const handleStripeWebhook = async (req, res) => {
  console.log('Webhook received');
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    console.log('Constructing event...');
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
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
        const paymentStatus = session.payment_status || '';
        let newReservationStatus = 'pending'; 
        if (paymentStatus === 'paid') {
          newReservationStatus = 'pay';
        } else if (paymentStatus === 'pending') {
          newReservationStatus = 'confirmed';
        } else if (paymentStatus === 'failed' || paymentStatus === 'canceled') {
          newReservationStatus = 'cancelled';
        }

        // Actualizar el estado de la reserva
        reservation.status = newReservationStatus;
        await reservation.save();
        console.log(`Reservation status updated to ${reservation.status}`);
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
