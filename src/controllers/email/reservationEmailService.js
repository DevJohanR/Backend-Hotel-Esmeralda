// email/reservationEmailService.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReservationConfirmationEmail = async ({ username, email, reservationDetails }) => {
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your reservation confirmation',
    text: `Hello ${username}, your reservation for the following services has been confirmed:\n${reservationDetails}`,
    html: `<strong>Hello ${username}</strong>,<br>Your reservation for the following services has been confirmed:<br>${reservationDetails}`,
  };

  try {
    await sgMail.send(message);
    console.log('Reservation confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending reservation confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendReservationConfirmationEmail,
};
