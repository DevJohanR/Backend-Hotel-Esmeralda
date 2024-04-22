const { Router } = require('express');
const {getUsersRegisteredByMonthAndDay} = require('../../controllers/charts/registeredUsers');

const router = Router();

router.get('/users', getUsersRegisteredByMonthAndDay);

module.exports = router;