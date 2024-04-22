const { Router } = require('express');
const { createDish } = require('../../controllers/dishes/createDishes');
const { getDishes } = require('../../controllers/dishes/getDishes');
const { editDishes } = require('../../controllers/dishes/editDishes');
const { deleteDishes } = require('../../controllers/dishes/deleteDishes');

const router = Router();

router.get('/', getDishes);
router.post('/', createDish);
router.patch('/:id', editDishes); 
router.delete('/:id', deleteDishes);

module.exports = router;
