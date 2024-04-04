const express = require("express");
const { createSession } = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-checkout-session", createSession);

router.get("/success", (req, res) => res.redirect("/success.html"));

router.get("/cancel", (req, res) => res.redirect("/cancel.html"));

module.exports = router;
