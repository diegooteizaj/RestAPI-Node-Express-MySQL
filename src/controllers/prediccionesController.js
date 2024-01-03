// prediccionesController.js

const dbConnection = require('../database/dbConnection');

const getAllPredicciones = (req, res) => {
    let sqlQuery = `SELECT * FROM predicciones;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getPrediccionById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT p.* FROM predicciones p WHERE p.Id_prediccion = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la predicción por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la predicción por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna predicción con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewPrediccion = (req, res) => {
    const prediccion = req.body;
    const prediccionObj = [
        prediccion.id_ducto,
        prediccion.id_tasa,
        prediccion.Metodo,
        prediccion.Espesor_proyectado,
        prediccion.Fecha_objetivo
    ];

    // Verificar que el objeto prediccion tiene todos los campos necesarios
    if (!prediccion.id_ducto || !prediccion.id_tasa || !prediccion.Metodo || 
        !prediccion.Espesor_proyectado || !prediccion.Fecha_objetivo) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO predicciones (id_ducto, id_tasa, Metodo, Espesor_proyectado, Fecha_objetivo) VALUES (?, ?, ?, ?, ?)';

    dbConnection.query(sqlQuery, prediccionObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la predicción:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la predicción. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Predicción creada correctamente.',
            insertedPrediccionId: result.insertId
        });
    });
};

const updatePrediccion = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const prediccion = req.body;
    const prediccionObj = [
        prediccion.id_ducto,
        prediccion.id_tasa,
        prediccion.Metodo,
        prediccion.Espesor_proyectado,
        prediccion.Fecha_objetivo
    ];

    // Verificar que el objeto prediccion tiene todos los campos necesarios
    if (!prediccion.id_ducto || !prediccion.id_tasa || !prediccion.Metodo || 
        !prediccion.Espesor_proyectado || !prediccion.Fecha_objetivo) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE predicciones SET id_ducto = ?, id_tasa = ?, Metodo = ?, Espesor_proyectado = ?, Fecha_objetivo = ? WHERE Id_prediccion = ?';

    dbConnection.query(sqlQuery, [...prediccionObj, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la predicción:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la predicción.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna predicción para actualizar con el ID proporcionado.`
            });
        }

        res.status(200).json({
            message: `Predicción con ID ${id} actualizada correctamente.`
        });
    });
};

const deletePrediccion = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM predicciones WHERE Id_prediccion = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la predicción:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la predicción.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna predicción con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Predicción con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllPredicciones,
    getPrediccionById,
    createNewPrediccion,
    updatePrediccion,
    deletePrediccion
};
