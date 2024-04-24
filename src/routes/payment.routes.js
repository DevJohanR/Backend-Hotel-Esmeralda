const { Router } = require('express');
const express = require("express");

const { createSession } = require("../controllers/payment.controller");
const { handleStripeWebhook } = require("../helpers/hookPaymentUpdate");
const express = require("express");

const router = Router();

router.post("/create-checkout-session", createSession);

router.post("/webhookStripe", express.raw({type: 'application/json'}),  handleStripeWebhook); 

module.exports = router;
