// metricasRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllMetricas,
    getMetricasById,
    createNewMetricas,
    updateMetricas,
    deleteMetricas
} = require('../controllers/metricasController.js');

router.get('/', getAllMetricas); // localhost:5000/metricas/
router.get('/getMetricasById/:id', getMetricasById); // localhost:5000/metricas/getMetricasById/1
router.post('/addMetricas', createNewMetricas); // localhost:5000/metricas/addMetricas
router.put('/updateMetricas/:id', updateMetricas); // localhost:5000/metricas/updateMetricas/1
router.delete('/deleteMetricas/:id', deleteMetricas); // localhost:5000/metricas/deleteMetricas/1

module.exports = router;
