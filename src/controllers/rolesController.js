const dbConnection = require('../database/dbConnection');

const getAllRoles = (req, res) => {
    let sqlQuery = 
    `SELECT * FROM roles;`
            ;
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};


const getRolesById = (req, res) =>{
    const id = req.params.id;
    if (isNaN(id)) {
                return res.json('You must enter a valid id as a parameter');
    }

    let sqlQuery = `SELECT r.* from roles r where r.id_rol = ${id};`

    dbConnection.query(sqlQuery, (error , results)=> {
             if (error) throw error; 
             res.status(200).json(results);
    });

    
};

const createNewRol = (req, res) => {
    const rol = req.body;
    const rolObj = [rol.id_rol, rol.rol, rol.descripcion_rol];

    // Verificar que el objeto rol tiene todos los campos necesarios
    if (!rol.id_rol || !rol.rol || !rol.descripcion_rol) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO roles (id_rol, rol, descripcion_rol) VALUES (?, ?, ?)';

    dbConnection.query(sqlQuery, rolObj, (err, result) => {
        if (err) {
            console.error('Error al insertar el rol:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el rol. ' ,
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Rol creado correctamente.',
            insertedRoleId: result.insertId
        });
    });
};


const updateRol = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const rol = req.body;
    const rolObj = [rol.rol, rol.descripcion_rol];

    if (!rol.rol || !rol.descripcion_rol) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE roles SET rol = ?, descripcion_rol = ? WHERE id_rol = ?';

    dbConnection.query(sqlQuery, [rolObj[0], rolObj[1], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el rol:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el rol.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ningún rol para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Rol con ID ${id} actualizado correctamente.`
        });
    });
};


// // Middleware para parsear el cuerpo JSON de la solicitud
// app.use(express.json());

// const obtenerRoles = (req, res) => {
//     const { id_rol } = req.body;
  
//     let sqlQuery = `
//       CALL ObtenerUsuario(?, ?, @codigoError, @codigoOk, @idRol);
//       SELECT @codigoError AS codigoError, @codigoOk AS codigoOk, @idRol AS idRol;
//     `;
  
//     dbConnection.query(sqlQuery, [id_rol], (error, results) => {
//       if (error) throw error;
  
//       const [result, codes] = results;
  
//       const { codigoError, codigoOk, idRol } = codes[0];
  
//       console.log('Código de error:', codigoError);
//       console.log('Código de éxito:', codigoOk);
//       console.log('ID de Rol:', idRol);
  
//       if (codigoError) {
//         res.status(400).json({ error: 'Usuario no encontrado' });
//       } else {
//         res.status(200).json({ codigoError, codigoOk, idRol });
//       }
//     });
//   };
  

const deleteRol = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM ROLES WHERE id_rol = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el rol:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el rol.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún rol con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Rol con ID ${id} eliminado correctamente.`
        });
    });
};




module.exports = {
    getAllRoles,
    getRolesById,
    createNewRol,
    updateRol,
    deleteRol
    
};




