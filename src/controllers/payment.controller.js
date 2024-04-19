// Importamos las dependencias necesarias
const Stripe = require('stripe');
const { sendReservationConfirmationEmail } = require('./email/reservationEmailService');
const { updateReservationStatusOnPayment } = require('../controllers/reservationStatusController/reservationStatusController'); // Asegúrate de que la ruta sea correcta
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Función para crear una sesión de pago con Stripe
const createSession = async (req, res) => {
  try {
    const { userId, services, totalPrice } = req.body;
    console.log('Total price:', totalPrice);
    console.log('Services:', services);
    console.log('User ID:', userId);

    // Creamos la sesión de pago con Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          product_data: {
            name: 'Services',
          },
          currency: 'usd',
          unit_amount: totalPrice * 100, // Convertimos el precio total a centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/bookingFour?payment=success',
      cancel_url: 'http://localhost:3000/bookingFour?payment=cancel',
      metadata: {
        userId: userId,
        services: JSON.stringify(services),
        totalPrice: totalPrice.toString()  // Guardamos el precio total en metadata para uso posterior
      },
    });

    // Enviamos un email de confirmación de la reserva
    const reservationDetails = JSON.stringify({ services, totalPrice });
    await sendReservationConfirmationEmail({ username: 'izan7777', email: 'iohan7777@proton.me', reservationDetails });

    console.log('Session URL:', session.url);
    return res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ message: error.message });
  }
};

// Webhook handler para Stripe
// Este código debería ir en una parte del servidor donde manejes los webhooks de Stripe
const stripeWebhookHandler = async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const services = JSON.parse(session.metadata.services);
    const totalPrice = parseFloat(session.metadata.totalPrice);

    // Actualizamos el estado de las reservaciones después de un pago exitoso
    await updateReservationStatusOnPayment(userId, {
      room_reservation_id: services.room_reservation_id,
      spa_reservation_id: services.spa_reservation_id,
      car_reservation_id: services.car_reservation_id,
      restaurant_reservation_id: services.restaurant_reservation_id,
      total_price: totalPrice
    });
  }

  // Respondemos al webhook con un 200 OK
  response.send();
};

module.exports = { createSession, stripeWebhookHandler };
