// medicionRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllMediciones,
    getMedicionById,
    createNewMedicion,
    updateMedicion,
    deleteMedicion,
    getMedicionByIdDucto,
    getMedicionAnillo,
    getMedicion
} = require('../controllers/medicionController');

router.get('/', getAllMediciones);
router.get('/getMedicionById/:id', getMedicionById);
router.post('/addMedicion', createNewMedicion);
router.put('/updateMedicion/:id', updateMedicion);
router.delete('/deleteMedicion/:id', deleteMedicion);
router.get('/getMedicionByIdDucto/:id',getMedicionByIdDucto);
router.get('/getMedicionAnillo/:id/:anillo',getMedicionAnillo);
router.post('/getMedicion',getMedicion)


module.exports = router;
