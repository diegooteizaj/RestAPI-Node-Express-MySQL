// lineaRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllLineas,
    getLineaById,
    createNewLinea,
    updateLinea,
    deleteLinea
} = require('../controllers/lineaController.js');

router.get('/', getAllLineas); // localhost:5000/lineas/
router.get('/getLineaById/:id', getLineaById); // localhost:5000/lineas/getLineaById/1
router.post('/addLinea', createNewLinea); // localhost:5000/lineas/addLinea
router.put('/updateLinea/:id', updateLinea); // localhost:5000/lineas/updateLinea/1
router.delete('/deleteLinea/:id', deleteLinea); // localhost:5000/lineas/deleteLinea/1

module.exports = router;
