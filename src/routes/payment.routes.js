const { Router } = require('express');

const { createCheckoutSession } = require("../controllers/payment.controller");
// const { stripeWebhookHandler } = require("../controllers/payment.controller");

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);
// router.post('/stripe-webhook', express.raw({type: 'application/json'}), stripeWebhookHandler);



module.exports = router;
