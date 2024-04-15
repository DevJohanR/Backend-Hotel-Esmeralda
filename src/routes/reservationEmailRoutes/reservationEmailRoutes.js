// routes/reservationEmailRoutes.js
const express = require('express');
const { sendConfirmationEmail } = require('../../controllers/reservationEmailController/reservationEmailController');

const router = express.Router();


router.post('/:id/send-confirmation-email', sendConfirmationEmail);

module.exports = router;
