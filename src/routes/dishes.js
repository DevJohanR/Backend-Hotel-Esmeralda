const { Router } = require('express');
const { createDish } = require('../controllers/dishes/createDishes');
const { getDishes } = require('../controllers/dishes/getDishes');
const { editDishes } = require('../controllers/dishes/editDishes');
const { deleteDishes } = require('../controllers/dishes/deleteDishes');

const router = Router();

router.post('/dishes', createDish);
router.get('/dishes', getDishes);
router.patch('/dishes/:id', editDishes); 
router.delete('/dishes/:id', deleteDishes);

module.exports = router;
