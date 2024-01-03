// inspectorRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllInspectores,
    getInspectorById,
    createNewInspector,
    updateInspector,
    deleteInspector
} = require('../controllers/inspectorController.js');

router.get('/', getAllInspectores); // localhost:5000/inspectores/
router.get('/getInspectorById/:id', getInspectorById); // localhost:5000/inspectores/getInspectorById/1
router.post('/addInspector', createNewInspector); // localhost:5000/inspectores/addInspector
router.put('/updateInspector/:id', updateInspector); // localhost:5000/inspectores/updateInspector/1
router.delete('/deleteInspector/:id', deleteInspector); // localhost:5000/inspectores/deleteInspector/1

module.exports = router;
