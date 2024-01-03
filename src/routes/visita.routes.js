// visitaRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllVisitas,
    getVisitaById,
    createNewVisita,
    updateVisita,
    deleteVisita
} = require('../controllers/visitaController');

router.get('/', getAllVisitas);
router.get('/getVisitaById/:id', getVisitaById);
router.post('/addVisita', createNewVisita);
router.put('/updateVisita/:id', updateVisita);
router.delete('/deleteVisita/:id', deleteVisita);

module.exports = router;
