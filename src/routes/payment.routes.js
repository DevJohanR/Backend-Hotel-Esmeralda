const { Router } = require("express");
const express = require("express");
const { createSession } = require("../controllers/payment.controller");
const { handleStripeWebhook } = require("../helpers/hookPaymentUpdate");


const router = Router();

router.post("/create-checkout-session", createSession);

router.post(
  "/webhookStripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.use(express.json({ limit: "20mb" }));

module.exports = router;
