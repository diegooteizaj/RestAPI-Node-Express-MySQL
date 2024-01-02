//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

//* Call the controller with the methods
const {
    getUsuarios,
    obtenerUsuario,
    getUsuarioById,
    createNewUsuario,
    updateUsuario,
    deleteUsuario
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
router.post('/addUsuario', createNewUsuario); //localhost:5000/customers/add
router.put('/updateUsuario/:id', updateUsuario); //localhost:5000/customers/edit/1
router.delete('/deleteUsuario/:id', deleteUsuario); //localhost:5000/customers/delete/1

module.exports = router;