// ductoController.js

const dbConnection = require('../database/dbConnection');

const getAllDuctos = (req, res) => {
    let sqlQuery = `SELECT * FROM ducto;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getDuctoById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT d.* FROM ducto d WHERE d.id_ducto = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el ducto por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener el ducto por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún ducto con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewDucto = (req, res) => {
    const ducto = req.body;
    const ductoObj = [
        ducto.id_ducto,
        ducto.N_Tramo,
        ducto.id_fabricacion,
        ducto.id_tipo_material,
        ducto.fecha_montaje,
        ducto.girado,
        ducto.id_linea,
        ducto.id_zona
    ];

    // // Verificar que el objeto ducto tiene todos los campos necesarios
    // if (!ducto.N_Tramo || !ducto.id_fabricacion || !ducto.id_tipo_material || !ducto.fecha_montaje || 
    //     !ducto.girado || !ducto.id_linea) {
    //     return res.status(400).json({
    //         errorCode: 400,
    //         message: 'Todos los campos deben estar completos.'
    //     });
    // }

    const sqlQuery = 'INSERT INTO ducto (id_ducto,N_Tramo, id_fabricacion, id_tipo_material, fecha_montaje, girado, id_linea,id_zona) VALUES (?,?, ?, ?, ?, ?, ?,?)';

    dbConnection.query(sqlQuery, ductoObj, (err, result) => {
        if (err) {
            console.error('Error al insertar el ducto:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el ducto. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Ducto creado correctamente.',
            insertedDuctoId: result.insertId
        });
    });
};

const updateDucto = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const ducto = req.body;
    const ductoObj = [
        ducto.N_Tramo,
        ducto.id_fabricacion,
        ducto.id_tipo_material,
        ducto.fecha_montaje,
        ducto.girado,
        ducto.id_linea,
        ducto.id_zona
    ];

    // Verificar que el objeto ducto tiene todos los campos necesarios
    // if (!ducto.N_Tramo || !ducto.id_fabricacion || !ducto.id_tipo_material || !ducto.fecha_montaje || 
    //     !ducto.girado || !ducto.id_linea) {
    //     return res.status(400).json({
    //         errorCode: 400,
    //         message: 'Todos los campos deben estar completos.'
    //     });
    // }

    const sqlQuery = 'UPDATE ducto SET N_Tramo = ?, id_fabricacion = ?, id_tipo_material = ?, fecha_montaje = ?, girado = ?, id_linea = ?, id_zona=? WHERE id_ducto = ?';

    dbConnection.query(sqlQuery, [...ductoObj, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el ducto:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el ducto.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún ducto para actualizar con el ID proporcionado.`
            });
        }

        res.status(200).json({
            message: `Ducto con ID ${id} actualizado correctamente.`
        });
    });
};

const deleteDucto = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM ducto WHERE id_ducto = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el ducto:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el ducto.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún ducto con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Ducto con ID ${id} eliminado correctamente.`
        });
    });
};


const getDuctosEstadoCorreccion = (req, res) => {
    let sqlQuery = `select distinct DUCTO.id_ducto ,l.nombre ,DUCTO.id_fabricacion , MEDICION.Anillo  from DUCTO , medicion,linea l  
    where DUCTO.id_ducto = MEDICION.id_ducto
    and ducto.id_linea = l.id_linea 
    and MEDICION.id_estado = 4 ;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

module.exports = {
    getAllDuctos,
    getDuctoById,
    createNewDucto,
    updateDucto,
    deleteDucto,
    getDuctosEstadoCorreccion
};
