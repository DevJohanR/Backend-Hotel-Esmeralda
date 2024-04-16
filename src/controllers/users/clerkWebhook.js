// clerkWebhookController.js

const { users, guest_profile } = require("../../db");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

async function handleClerkWebhook(req, res) {
  try {
    const event = req.body;
    const eventType = event.type;

    if (eventType === "user.created") {
      const userId = event.data.id;
      const email = event.data.email_addresses[0].email_address;
      const username = event.data.username || email;
      const imageUrl = event.data.image_url;

      const userExists = await users.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (!userExists) {
        const hashedPassword = await bcrypt.hash(userId, 10);

        const newUser = await users.create({
          username,
          email,
          password: hashedPassword,
          emailVerified: true,
          role: "customer",
          is_active: true,
        });

        console.log(`User ${userId} was created with email ${email}`);

        const newGuestProfile = await guest_profile.create({
          user_id: newUser.id,
          photo_url: imageUrl,
        });

        console.log(
          `Guest profile for user ${userId} was created with photo URL ${imageUrl}`
        );
      } else {
        console.log(`User ${userId} already exists`);
      }
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing webhook" });
  }
}

module.exports = { handleClerkWebhook };
