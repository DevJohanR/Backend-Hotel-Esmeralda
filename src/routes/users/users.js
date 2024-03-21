const { Router } = require('express');
const { checkUserExists } = require('../../controllers/users/checkUser');
const { register } = require('../../controllers/users/register');
const { getAllUsers } = require('../../controllers/users/getAllUsers');
const { login } = require('../../controllers/users/login');
const { authenticateToken } = require('../../helpers/authenticateToken');

const router = Router();

router.post('/register', register);
router.get('/checkUser', checkUserExists);
router.get('/allUsers', authenticateToken, getAllUsers);
router.post('/login', login)

module.exports = router;
