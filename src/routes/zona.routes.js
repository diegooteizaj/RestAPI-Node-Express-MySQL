//* Import express and initialize the routers
const express = require('express');
const router = express.Router();

const { getZona } = require('../controllers/zonaController');
  
//* Here I defined the methods 
router.get('/', getZona); //localhost:5000/customers/

module.exports = router;