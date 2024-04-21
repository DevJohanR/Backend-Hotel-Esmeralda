const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const { user_reservations } = require("../db");

const baseUrl = process.env.BASE_URL;

const createSession = async (req, res) => {
  try {
    const { userId, services, totalPrice } = req.body;
    console.log("Services: ", services);  


    // Generate line items dynamically from the services object
    const lineItems = Object.keys(services).map((key) => {
      const service = services[key];
      const name = service.name || "Unnamed Service"; // Fallback if no name is provided
      var price = 0;

      // Determine the appropriate price based on the type of service
      switch (key) {
        case "room":
          price = Math.round(service.price * 100);
          break;
        case "spa":
          price = Math.round(service.price * 100);
          break;
        case "car":
          price = Math.round(service.price_per_day * 100);
          break;
        default:
          throw new Error(`Unknown service type: ${key}`);
      }
      console.log("Price: ", price);
      return {
        price_data: {
          product_data: {
            name: `${name} - ${key.toUpperCase()}`,
          },
          currency: "usd",
          unit_amount: price, 
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}bookingSuccess`,
      cancel_url: `${baseUrl}bookingFail`,
      metadata: {
        user_id: userId,
        services: JSON.stringify(services),
      },
    });

    const reservation = await user_reservations.create({
      user_id: userId,
      stripe_session_id: session?.id,
      room_id: services?.room?.id,
      spa_id: services?.spa?.id,
      car_id: services?.car?.id,
      check_in_date: services.room.check_in_date,
      check_out_date: services.room.check_out_date,
      total_price: totalPrice, 
      status: "pending",
    });

    console.log(
      "Reservation created with Stripe session ID:",
      reservation.stripe_session_id
    );
    console.log("Checkout session URL:", session.url);
    return res.json({ url: session.url, reservationId: reservation.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
