// estadosRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllEstados,
    getEstadoById,
    createNewEstado,
    updateEstado,
    deleteEstado
} = require('../controllers/estadosController.js');

router.get('/', getAllEstados); // localhost:5000/estados/
router.get('/getEstadoById/:id', getEstadoById); // localhost:5000/estados/getEstadoById/1
router.post('/addEstado', createNewEstado); // localhost:5000/estados/addEstado
router.put('/updateEstado/:id', updateEstado); // localhost:5000/estados/updateEstado/1
router.delete('/deleteEstado/:id', deleteEstado); // localhost:5000/estados/deleteEstado/1

module.exports = router;
