const { Router } = require('express');
const { checkUserExists } = require('../../controllers/users/checkUser');
const { register } = require('../../controllers/users/register');
const { getAllUsers } = require('../../controllers/users/getAllUsers');
const { loginUser } = require('../../controllers/users/loginUser');


const router = Router();

router.post('/register', register);
router.get('/checkUser', checkUserExists);
router.get('/allUsers', getAllUsers);
router.post('/login', loginUser);

module.exports = router;
