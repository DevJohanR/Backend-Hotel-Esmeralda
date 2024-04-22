// email/reservationEmailService.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReservationConfirmationEmail = async ({ username, email }) => {
  const UrlHotel = `http://localhost:3000/checkin`;
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your reservation confirmation', 
    templateId: 'd-01be013a3f4446e59a85e5255806951e', 
    dynamicTemplateData: {
      username: username,
      UrlHotel:  UrlHotel
    },
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