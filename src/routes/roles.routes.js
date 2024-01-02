//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

//* Call the controller with the methods
const {
    getAllRoles,
    getRolesById,
    createNewRol,
    updateRol,
    deleteRol

  } = require('../controllers/rolesController.js');
  
//* Here I defined the methods 
router.get('/', getAllRoles); //localhost:5000/customers/
router.get('/getRolesById/:id', getRolesById); //localhost:5000/customers/
router.post('/addRol', createNewRol); //localhost:5000/customers/add
router.put('/updateRol/:id', updateRol); //localhost:5000/customers/edit/1
router.delete('/deleteRol/:id', deleteRol); //localhost:5000/customers/delete/1

module.exports = router;