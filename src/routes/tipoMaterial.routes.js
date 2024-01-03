// tipoMaterialRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllTiposMaterial,
    getTipoMaterialById,
    createNewTipoMaterial,
    updateTipoMaterial,
    deleteTipoMaterial
} = require('../controllers/tipoMaterialController.js');

router.get('/', getAllTiposMaterial); // localhost:5000/tiposmaterial/
router.get('/getTipoMaterialById/:id', getTipoMaterialById); // localhost:5000/tiposmaterial/getTipoMaterialById/1
router.post('/addTipoMaterial', createNewTipoMaterial); // localhost:5000/tiposmaterial/addTipoMaterial
router.put('/updateTipoMaterial/:id', updateTipoMaterial); // localhost:5000/tiposmaterial/updateTipoMaterial/1
router.delete('/deleteTipoMaterial/:id', deleteTipoMaterial); // localhost:5000/tiposmaterial/deleteTipoMaterial/1

module.exports = router;
