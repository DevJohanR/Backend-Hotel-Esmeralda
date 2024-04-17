// email/reservationEmailService.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReservationConfirmationEmail = async ({ username, email, reservationDetails }) => {
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your reservation confirmation', // Puedes configurar este valor según necesites
    templateId: 'd-01be013a3f4446e59a85e5255806951e', // ID de la plantilla de SendGrid
    dynamicTemplateData: {
      username: username,
      reservationNumber: reservationDetails.reservation_number,
      checkInDate: reservationDetails.check_in_date.toISOString().slice(0, 10), // Formato YYYY-MM-DD
      checkOutDate: reservationDetails.check_out_date.toISOString().slice(0, 10),
      totalPaid: reservationDetails.total_price.toFixed(2),
      reservationDetails: JSON.stringify(reservationDetails) // Aquí puedes personalizar cómo deseas mostrar los detalles
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
