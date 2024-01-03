// ductoRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllDuctos,
    getDuctoById,
    createNewDucto,
    updateDucto,
    deleteDucto
} = require('../controllers/ductoController.js');

router.get('/', getAllDuctos); // localhost:5000/ductos/
router.get('/getDuctoById/:id', getDuctoById); // localhost:5000/ductos/getDuctoById/1
router.post('/addDucto', createNewDucto); // localhost:5000/ductos/addDucto
router.put('/updateDucto/:id', updateDucto); // localhost:5000/ductos/updateDucto/1
router.delete('/deleteDucto/:id', deleteDucto); // localhost:5000/ductos/deleteDucto/1

module.exports = router;
