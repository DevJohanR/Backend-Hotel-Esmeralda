const { Router } = require('express');

const { createSession } = require("../controllers/payment.controller");

const router = Router();

router.post("/create-checkout-session", createSession);






module.exports = router;