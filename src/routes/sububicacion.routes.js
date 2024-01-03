// sububicacionRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllSubUbicaciones,
    getSubUbicacionById,
    createNewSubUbicacion,
    updateSubUbicacion,
    deleteSubUbicacion
} = require('../controllers/sububicacionController.js');

router.get('/', getAllSubUbicaciones); // localhost:5000/sububicaciones/
router.get('/getSubUbicacionById/:id', getSubUbicacionById); // localhost:5000/sububicaciones/getSubUbicacionById/1
router.post('/addSubUbicacion', createNewSubUbicacion); // localhost:5000/sububicaciones/addSubUbicacion
router.put('/updateSubUbicacion/:id', updateSubUbicacion); // localhost:5000/sububicaciones/updateSubUbicacion/1
router.delete('/deleteSubUbicacion/:id', deleteSubUbicacion); // localhost:5000/sububicaciones/deleteSubUbicacion/1

module.exports = router;
