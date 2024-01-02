//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

//* Call the controller with the methods
const {
    getUsuarios,
    obtenerUsuario,
    getUsuarioById
    // getPersonasById,
    // createNewCustomer,
    // updatePersona,
    // deleteUnaPersona,
    // createNewPersona,
    // deleteAllCustomers
  } = require('../controllers/usuariosController.js');
  
//* Here I defined the methods 
router.get('/', getUsuarios); //localhost:5000/customers/
router.post('/obtenerUsuario', obtenerUsuario); //localhost:5000/customers/
router.get('/getUsuarioById/:id', getUsuarioById); //localhost:5000/customers/id/1
// router.post('/addPersona', createNewPersona); //localhost:5000/customers/add
// router.put('/updatePersona/:id', updatePersona); //localhost:5000/customers/edit/1
// router.delete('/deletePersonas/:id', deleteUnaPersona); //localhost:5000/customers/delete/1
// router.delete('/deleteCustomers', deleteAllCustomers); //localhost:5000/customers/deleteCustomers

module.exports = router;