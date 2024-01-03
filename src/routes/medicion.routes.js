// medicionRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllMediciones,
    getMedicionById,
    createNewMedicion,
    updateMedicion,
    deleteMedicion
} = require('../controllers/medicionController');

router.get('/', getAllMediciones);
router.get('/getMedicionById/:id', getMedicionById);
router.post('/addMedicion', createNewMedicion);
router.put('/updateMedicion/:id', updateMedicion);
router.delete('/deleteMedicion/:id', deleteMedicion);

module.exports = router;
