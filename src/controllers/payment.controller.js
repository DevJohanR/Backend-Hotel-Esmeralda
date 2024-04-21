const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const { user_reservations } = require('../db');

const createSession = async (req, res) => {
  try {
    const { userId, services, totalPrice } = req.body;
    console.log('Total price: ', totalPrice);
    console.log('Services: ', services);
    console.log('User ID: ', userId);

    // Generate line items dynamically from the services object
    const lineItems = Object.keys(services).map(key => {
      let service = services[key];
      let price = 0;
      let name = service.name || 'Unnamed Service'; // Fallback to 'Unnamed Service' if name is not provided

      // Determine the appropriate price based on the type of service
      switch (key) {
        case 'room':
          price = service.price_per_night;
          break;
        case 'spa':
          price = service.price;
          break;
        case 'car':
          price = service.price_per_day;
          break;
        default:
          throw new Error(`Unknown service type: ${key}`);
      }
      

      return {
        price_data: {
          product_data: {
            name: `${name} - ${key.toUpperCase()}`,
          },
          currency: 'usd',
          unit_amount: Math.round(price * 100), 
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/bookingFour?payment=success',
      cancel_url: 'http://localhost:3000/bookingFour?payment=cancel',
      metadata: {
        userId: userId,
        services: JSON.stringify(services),
      },
    });

    const reservation = await user_reservations.create({
      userId: userId,
      stripe_session_id: session.id,
      total_price: totalPrice,
      status: 'pending' 
    });

    console.log('Reservation created with Stripe session ID:', reservation.stripe_session_id);
    console.log('Checkout session URL:', session.url);
    return res.json({ url: session.url, reservationId: reservation.id });
    } catch (error) {
    console.error('Error creating Stripe session:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
