// prediccionesRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllPredicciones,
    getPrediccionById,
    createNewPrediccion,
    updatePrediccion,
    deletePrediccion
} = require('../controllers/prediccionesController');

router.get('/', getAllPredicciones);
router.get('/getPrediccionById/:id', getPrediccionById);
router.post('/addPrediccion', createNewPrediccion);
router.put('/updatePrediccion/:id', updatePrediccion);
router.delete('/deletePrediccion/:id', deletePrediccion);

module.exports = router;
