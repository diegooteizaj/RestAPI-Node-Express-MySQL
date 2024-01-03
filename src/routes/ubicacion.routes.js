const express = require('express');
const router = express.Router();
const {
    getAllUbicaciones,
    getUbicacionById,
    createNewUbicacion,
    updateUbicacion,
    deleteUbicacion
} = require('../controllers/ubicacionController.js');

router.get('/', getAllUbicaciones); //localhost:5000/ubicaciones/
router.get('/getUbicacionById/:id', getUbicacionById); //localhost:5000/ubicaciones/getUbicacionById/1
router.post('/addUbicacion', createNewUbicacion); //localhost:5000/ubicaciones/addUbicacion
router.put('/updateUbicacion/:id', updateUbicacion); //localhost:5000/ubicaciones/updateUbicacion/1
router.delete('/deleteUbicacion/:id', deleteUbicacion); //localhost:5000/ubicaciones/deleteUbicacion/1

module.exports = router;
