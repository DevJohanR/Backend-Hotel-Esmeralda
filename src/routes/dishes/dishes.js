const { Router } = require('express');
const { createDish } = require('../../controllers/dishes/createDishes');
const { getDishes } = require('../../controllers/dishes/getDishes');
const { editDishes } = require('../../controllers/dishes/editDishes');
const { deleteDishes } = require('../../controllers/dishes/deleteDishes');

const router = Router();

router.post('/', createDish);
router.get('/', getDishes);
router.patch('/:id', editDishes); 
router.delete('/:id', deleteDishes);

module.exports = router;
