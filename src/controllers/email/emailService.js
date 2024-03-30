const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({ username, email, confirmationToken }) => {
  const confirmationUrl = `http://localhost:4000/auth/confirm/${confirmationToken}`;
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Confirma tu correo electrónico',
    text: `Hola ${username}, por favor confirma tu correo electrónico haciendo clic en el siguiente enlace: ${confirmationUrl}`,
    html: `<p>Hola ${username},</p><p>Por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:</p><a href="${confirmationUrl}">Confirmar Email</a>`,
  };

  try {
    await sgMail.send(message);
    console.log('Email de confirmación enviado');
  } catch (error) {
    // Imprimir más detalles sobre el error
    if (error.response) {
      console.error('Response error:', error.response.body); // Imprimir el cuerpo del error de la respuesta
    } else {
      console.error('Error enviando email de confirmación:', error);
    }
    // Lanzar un error con el mensaje original para seguir la ejecución del error en el catch de más arriba en la cadena de llamadas
    throw new Error('Error enviando email de confirmación');
  }
};

module.exports = {
  sendConfirmationEmail,
};
