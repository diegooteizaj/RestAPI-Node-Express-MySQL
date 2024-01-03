// lineaController.js

const dbConnection = require('../database/dbConnection');

const getAllLineas = (req, res) => {
    let sqlQuery = `SELECT * FROM linea;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getLineaById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT l.* FROM linea l WHERE l.id_linea = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la línea por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la línea por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna línea con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewLinea = (req, res) => {
    const linea = req.body;
    const lineaObj = [linea.nombre, linea.N_tramos, linea.id_SubUbicacion];

    // Verificar que el objeto línea tiene todos los campos necesarios
    if (!linea.nombre || isNaN(linea.N_tramos) || isNaN(linea.id_SubUbicacion)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y N_tramos, id_SubUbicacion deben ser números.'
        });
    }

    const sqlQuery = 'INSERT INTO linea (nombre, N_tramos, id_SubUbicacion) VALUES (?, ?, ?)';

    dbConnection.query(sqlQuery, lineaObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la línea:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la línea. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Línea creada correctamente.',
            insertedLineaId: result.insertId
        });
    });
};

const updateLinea = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const linea = req.body;
    const lineaObj = [linea.nombre, linea.N_tramos, linea.id_SubUbicacion];

    // Verificar que el objeto línea tiene todos los campos necesarios
    if (!linea.nombre || isNaN(linea.N_tramos) || isNaN(linea.id_SubUbicacion)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos y N_tramos, id_SubUbicacion deben ser números.'
        });
    }

    const sqlQuery = 'UPDATE linea SET nombre = ?, N_tramos = ?, id_SubUbicacion = ? WHERE id_linea = ?';

    dbConnection.query(sqlQuery, [lineaObj[0], lineaObj[1], lineaObj[2], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la línea:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la línea.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ninguna línea para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Línea con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteLinea = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM linea WHERE id_linea = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la línea:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la línea.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna línea con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Línea con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllLineas,
    getLineaById,
    createNewLinea,
    updateLinea,
    deleteLinea
};
