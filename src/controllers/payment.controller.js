const Stripe = require('stripe');
const { sendReservationConfirmationEmail } = require('./email/reservationEmailService');
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {
  try {
    const { userId, services, totalPrice } = req.body;
    console.log('Total price: ', totalPrice);
    console.log('Services: ', services);
    console.log('User ID: ', userId);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Services',
            },
            currency: 'usd',
            unit_amount: totalPrice * 100, // Convertimos el precio total a centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/bookingFour?payment=success',
      cancel_url: 'http://localhost:3000/bookingFour?payment=cancel',
      metadata: {
        userId: userId,
        services: JSON.stringify(services),
      },
    });

    const reservationDetails = JSON.stringify({ services, totalPrice });
    await sendReservationConfirmationEmail({ username: 'izan7777', email: 'iohan7777@proton.me', reservationDetails });/* username:username */ /* actualizar para enviar - controlador */

    console.log(session.url);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
