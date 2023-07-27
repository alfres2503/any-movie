const express = require('express');
const router = express.Router();

//Controlador
const commentController = require('../controllers/commentController');

//Rutas
//locahost:3000/orden/

router.get('/', commentController.get);

router.get('/:id', commentController.getById);

router.get('/product/:id', commentController.getByProductId);

router.post('/', commentController.create);

// router.put('/:id', commentController.update);

module.exports = router;
