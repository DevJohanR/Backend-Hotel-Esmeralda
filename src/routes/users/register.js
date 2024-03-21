// routes/auth.js
const { Router } = require('express');
const { register } = require('../../controllers/users/register');
const router = Router();

router.post('/register', register);

module.exports = router;
