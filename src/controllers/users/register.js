const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { users, guest_profile, connect } = require("../../db");
const { sendConfirmationEmail } = require("../email/emailService");
const { generateEmailVerificationToken } = require("../../helpers/jwt");

const register = async (req, res, next) => {
  const transaction = await connect.transaction();

  try {
    const { role } = req.query;
    const { username, email, password, full_name, phone_number, gender } =
      req.body;

    const userExists = await users.findOne({
      where: {
        [Op.or]: { email, username },
      },
    });

    if (userExists) {
      return res.status(409).json({
        message:
          "El correo electrónico o el nombre de usuario ya están en uso.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create(
      role
        ? {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role.toLowerCase(),
          }
        : {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
          },
      { transaction }
    );
    if (phone_number || (full_name && gender)) {
      const user_details = await guest_profile.create(
        {
          user_id: newUser.id,
          phone_number,
          full_name,
          gender,
        },
        { transaction }
      );
    }
    transaction.commit();

    const verificationToken = generateEmailVerificationToken(email);

    await sendConfirmationEmail({
      username,
      email,
      verificationCode: verificationToken,
    });
    console.log("Correo de confirmación enviado:", email);

    return res.status(201).json({
      message:
        "Usuario registrado con éxito. Se ha enviado un correo electrónico de verificación.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    transaction.rollback();
    return res.status(500).json(error);
  }
};

module.exports = {
  register,
};
