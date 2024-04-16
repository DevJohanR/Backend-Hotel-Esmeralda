const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {
  try {
    const { userId, room_types, room_spa, car_details, totalPrice } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: room_types.name, 
            },
            currency: "usd",
            unit_amount: totalPrice.room, 
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: room_spa.name, 
            },
            currency: "usd",
            unit_amount: totalPrice.spa, 
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: car_details.brands, 
            },
            currency: "usd",
            unit_amount: totalPrice.car, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/bookingFour?payment=success",
      cancel_url: "http://localhost:3000/bookingFour?payment=cancel",
      metadata: {
        userId: userId,
        room_types: JSON.stringify(room_types), 
        room_spa: JSON.stringify(room_spa), 
        car_details: JSON.stringify(car_details), 
      },
    });

    console.log(session.url);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
