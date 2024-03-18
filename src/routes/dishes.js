const { Router } = require('express');
const dishController = require('../controllers/dishController');

const router = Router();

router.post('/dishes', dishController.createDish);
router.get('/dishes', dishController.getDishes);

module.exports = router;
