// sububicacionController.js

const dbConnection = require('../database/dbConnection');

const getAllSubUbicaciones = (req, res) => {
    let sqlQuery = `SELECT * FROM sububicaciones;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getSubUbicacionById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT su.* FROM sububicaciones su WHERE su.id_SubUbicacion = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la sububicación por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la sububicación por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna sububicación con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewSubUbicacion = (req, res) => {
    const subUbicacion = req.body;
    const subUbicacionObj = [subUbicacion.Nombre_SubUbicacion, subUbicacion.id_Ubicacion];

    // Verificar que el objeto subUbicacion tiene todos los campos necesarios
    if (!subUbicacion.Nombre_SubUbicacion || isNaN(subUbicacion.id_Ubicacion)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y el id_Ubicacion debe ser un número.'
        });
    }

    const sqlQuery = 'INSERT INTO sububicaciones (Nombre_SubUbicacion, id_Ubicacion) VALUES (?, ?)';

    dbConnection.query(sqlQuery, subUbicacionObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la sububicación:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la sububicación. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Sububicación creada correctamente.',
            insertedSubUbicacionId: result.insertId
        });
    });
};

const updateSubUbicacion = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const subUbicacion = req.body;
    const subUbicacionObj = [subUbicacion.Nombre_SubUbicacion, subUbicacion.id_Ubicacion];

    // Verificar que el objeto subUbicacion tiene todos los campos necesarios
    if (!subUbicacion.Nombre_SubUbicacion || isNaN(subUbicacion.id_Ubicacion)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y el id_Ubicacion debe ser un número.'
        });
    }

    const sqlQuery = 'UPDATE sububicaciones SET Nombre_SubUbicacion = ?, id_Ubicacion = ? WHERE id_SubUbicacion = ?';

    dbConnection.query(sqlQuery, [subUbicacionObj[0], subUbicacionObj[1], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la sububicación:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la sububicación.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ninguna sububicación para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Sububicación con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteSubUbicacion = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM sububicaciones WHERE id_SubUbicacion = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la sububicación:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la sububicación.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna sububicación con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Sububicación con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllSubUbicaciones,
    getSubUbicacionById,
    createNewSubUbicacion,
    updateSubUbicacion,
    deleteSubUbicacion
};
