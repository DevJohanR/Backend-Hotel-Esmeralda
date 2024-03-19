const { Router } = require('express');
const dishController = require('../controllers/dishController');

const router = Router();

router.post('/dishes', dishController.createDish);
router.get('/dishes', dishController.getDishes);
router.patch('/dishes/:id', dishController.editDishes); 
router.delete('/dishes/:id', dishController.deleteDishes);

module.exports = router;
