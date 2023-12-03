const dbConnection = require('../database/dbConnection');

const getPersonas = (req, res) => {
    let sqlQuery = 'SELECT * FROM INSPECTOR';
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



const deleteUnaPersona = (req, res) => {

   // const id = parseInt(req.params.id);
    const id = req.params.id

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }
    
    let sqlQuery = `DELETE FROM INSPECTOR WHERE id_inspector = ${id}`;

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json(`Persona with id ${id} deleted successfully`);
    });
};

const getPersonasById = (req, res) => {

    // const id = parseInt(req.params.id);
    const id = req.params.id
    let sqlQuery = `SELECT * FROM INSPECTOR WHERE id_inspector = ${id}`;

    // This method verifies that the id passed by parameter is a number, if it is not, it sends an error message
    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

 const updatePersona = (req, res) => {
    
    const id = parseInt(req.params.id);
    const persona = req.body;
    const personaObj = [
        persona.nombre,
        persona.rut,
        persona.telefono,
        persona.visita
    ];

    console.log('persona obj UPD ->', personaObj);

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }


    let sqlQuery = `UPDATE INSPECTOR SET nombre = ?, rut = ?, telefono = ?, visita = ? WHERE id_inspector = ${id}`

    dbConnection.query(sqlQuery, personaObj,  (error, result) => {
        if (error) throw error;
        if (result.affectedRow === 0) {
            res.send('No customer was updated');
        }
        res.json(`persona with id ${id} updated successfully`);
    });
};
const createNewPersona = (req, res) => {

    // Declare that I store the request body in a constant
    const persona = req.body;
    // So, I create the object with the table fields by calling the constant customer
    const personaObj = [
        persona.id_inspector,
        persona.nombre,
        persona.rut,
        persona.telefono,
        persona.Visita,
        
    ];

    // // This method verifies that the request body has all the complete fields, otherwise the operation will not be executed and sends an error message
    // if (!customer.first_name || !customer.last_name || !customer.email || !customer.age) {
    //     return res.json({
    //         ErrorCode: 204,
    //         Message: 'Fields cannot be empty'
    //     });
    // }

    let sqlQuery = 'INSERT INTO INSPECTOR (id_inspector, nombre, rut, Telefono, Visita) VALUES ( ?,?,?,?,? )';

    dbConnection.query(sqlQuery, personaObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Customer created with id: ' + result.insertId);
    });
};


module.exports = {
    getPersonas,
    deleteUnaPersona,
    getPersonasById,
    updatePersona,
    createNewPersona
};




// export const deleteAllCustomers = (req, res) => {

//     let sqlQuery = 'TRUNCATE TABLE customers';

//     dbConnection.query(sqlQuery, error => {
//         if (error) throw error; 
//         res.status(200).json('All records have been erased');
//     });
// };