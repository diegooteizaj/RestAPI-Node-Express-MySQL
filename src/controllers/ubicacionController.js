const dbConnection = require('../database/dbConnection');

const getAllUbicaciones = (req, res) => {
    let sqlQuery = `SELECT * FROM ubicacion;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getUbicacionById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT u.* FROM ubicacion u WHERE u.id_Ubicacion = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la ubicación por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la ubicación por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna ubicación con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewUbicacion = (req, res) => {
    const ubicacion = req.body;
    const ubicacionObj = [ubicacion.Nombre_Ubicacion, ubicacion.id_Proyecto];

    // Verificar que el objeto ubicacion tiene todos los campos necesarios
    if (!ubicacion.Nombre_Ubicacion || isNaN(ubicacion.id_Proyecto)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y el id_Proyecto debe ser un número.'
        });
    }

    const sqlQuery = 'INSERT INTO ubicacion (Nombre_Ubicacion, id_Proyecto) VALUES (?, ?)';

    dbConnection.query(sqlQuery, ubicacionObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la ubicación:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la ubicación. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Ubicación creada correctamente.',
            insertedUbicacionId: result.insertId
        });
    });
};

const updateUbicacion = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const ubicacion = req.body;
    const ubicacionObj = [ubicacion.Nombre_Ubicacion, ubicacion.id_Proyecto];

    // Verificar que el objeto ubicacion tiene todos los campos necesarios
    if (!ubicacion.Nombre_Ubicacion || isNaN(ubicacion.id_Proyecto)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y el id_Proyecto debe ser un número.'
        });
    }

    const sqlQuery = 'UPDATE ubicacion SET Nombre_Ubicacion = ?, id_Proyecto = ? WHERE id_Ubicacion = ?';

    dbConnection.query(sqlQuery, [ubicacionObj[0], ubicacionObj[1], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la ubicación:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la ubicación.',
                errorConsola:error,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ninguna ubicación para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Ubicación con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteUbicacion = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM ubicacion WHERE id_Ubicacion = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la ubicación:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la ubicación.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna ubicación con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Ubicación con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllUbicaciones,
    getUbicacionById,
    createNewUbicacion,
    updateUbicacion,
    deleteUbicacion
};
