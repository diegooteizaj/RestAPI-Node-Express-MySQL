//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

//* Call the controller with the methods
const {
    getProyecto,
    getProyectoById,
    createNewProyecto,
    updateProyecto,
    deleteProyecto

  } = require('../controllers/proyectoController');
  
//* Here I defined the methods 
router.get('/', getProyecto); //localhost:5000/customers/
router.get('/getProyectoById/:id', getProyectoById); //localhost:5000/customers/id/1
router.post('/addProyecto', createNewProyecto); //localhost:5000/customers/add
router.put('/updateProyecto/:id', updateProyecto); //localhost:5000/customers/edit/1
router.delete('/deleteProyecto/:id', deleteProyecto); //localhost:5000/customers/delete/1
// router.delete('/deleteCustomers', deleteAllCustomers); //localhost:5000/customers/deleteCustomers

module.exports = router;