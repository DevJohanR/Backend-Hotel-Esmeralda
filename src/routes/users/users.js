const { Router } = require('express');
const { checkUserExists } = require('../../controllers/users/checkUser');
const { register } = require('../../controllers/users/register');
const { getAllUsers } = require('../../controllers/users/getAllUsers');
const { login } = require('../../controllers/users/login');
const { authenticateToken } = require('../../helpers/authenticateToken');
const createGuestProfile = require('../../controllers/users/createGuestProfile');
const deleteGuestProfile = require('../../controllers/users/DeleteGuestProfile');

const router = Router();
router.delete('/deleteguestprofile/:user_id',deleteGuestProfile)
router.post('/register', register);
router.get('/checkUser', checkUserExists);
router.get('/allUsers', authenticateToken, getAllUsers);
router.post('/login', login)
router.post('/createguestprofile',createGuestProfile)
module.exports = router;
