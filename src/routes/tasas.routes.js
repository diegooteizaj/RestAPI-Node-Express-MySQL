// tasasRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllTasas,
    getTasaById,
    createNewTasa,
    updateTasa,
    deleteTasa
} = require('../controllers/tasasController');

router.get('/', getAllTasas);
router.get('/getTasaById/:id', getTasaById);
router.post('/addTasa', createNewTasa);
router.put('/updateTasa/:id', updateTasa);
router.delete('/deleteTasa/:id', deleteTasa);

module.exports = router;
