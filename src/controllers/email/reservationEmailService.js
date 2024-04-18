// email/reservationEmailService.js

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReservationConfirmationEmail = async ({ username, email, reservationDetails }) => {
  const UrlHotel = `http://localhost:3000/checkin`;

  const reservationNumber = reservationDetails.reservation_number;
  const checkInDate = reservationDetails.check_in_date.toISOString().slice(0, 10); 
  const checkOutDate = reservationDetails.check_out_date.toISOString().slice(0, 10); 
  const totalPaid = reservationDetails.total_price.toFixed(2); 
  const reservationDetailsString = JSON.stringify(reservationDetails); 

  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your reservation confirmation',
    templateId: 'd-01be013a3f4446e59a85e5255806951e',
    dynamicTemplateData: {
      username: username,
      reservationNumber: reservationNumber,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPaid: totalPaid,
      reservationDetails: reservationDetailsString,
      UrlHotel: UrlHotel
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


/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReservationConfirmationEmail = async ({ username, email, reservationDetails }) => {
  const UrlHotel = `http://localhost:3000/checkin`;
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Your reservation confirmation', 
    templateId: 'd-01be013a3f4446e59a85e5255806951e', 
    dynamicTemplateData: {
      username: username,
      // reservationNumber: reservationDetails.reservation_number,
      // checkInDate: reservationDetails.check_in_date.toISOString().slice(0, 10), 
      // checkOutDate: reservationDetails.check_out_date.toISOString().slice(0, 10),
      // totalPaid: reservationDetails.total_price.toFixed(2),
      // reservationDetails: JSON.stringify(reservationDetails),
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
*/