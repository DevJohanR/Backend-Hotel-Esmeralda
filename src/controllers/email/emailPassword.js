const sgMail = require("@sendgrid/mail");
const { generatePasswordReset } = require("../../helpers/jwt");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send password reset email
const sendPasswordResetEmail = async ({ email }) => {
  const token = generatePasswordReset(email);
  const resetUrl = `http://localhost:3000/passwordRecovery?${token}`;

  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Reset your password",
    templateId: "d-3236090be3234a4b88a3e56a8c34d460",
    dynamicTemplateData: {
      resetUrl: resetUrl,
    },
  };

  try {
    await sgMail.send(message);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

module.exports = {
  sendPasswordResetEmail,
};
