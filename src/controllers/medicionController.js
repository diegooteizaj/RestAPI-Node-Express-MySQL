// medicionController.js

const dbConnection = require('../database/dbConnection');

const getAllMediciones = (req, res) => {
    let sqlQuery = `SELECT * FROM medicion;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getMedicionById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT m.* FROM medicion m WHERE m.Id_medicion = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la medición por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la medición por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna medición con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewMedicion = (req, res) => {
    const medicion = req.body;
    const medicionObj = [
        medicion.Fecha_medicion,
        medicion.id_linea,
        medicion.id_ducto,
        medicion.Anillo,
        medicion.Espesor_min,
        medicion.Mediciones,
        medicion.direccion_minimo,
        medicion.observaciones,
        medicion.id_estado
    ];

    // Verificar que el objeto medicion tiene todos los campos necesarios
    if (!medicion.Fecha_medicion || !medicion.id_linea || !medicion.id_ducto || !medicion.Anillo ||
        !medicion.Espesor_min || !medicion.Mediciones || !medicion.direccion_minimo || !medicion.observaciones ||
        !medicion.id_estado) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO medicion (Fecha_medicion, id_linea, id_ducto, Anillo, Espesor_min, Mediciones, direccion_minimo, observaciones, id_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    dbConnection.query(sqlQuery, medicionObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la medición:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la medición. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Medición creada correctamente.',
            insertedMedicionId: result.insertId
        });
    });
};

const updateMedicion = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const medicion = req.body;
    const medicionObj = [
        medicion.Fecha_medicion,
        medicion.id_linea,
        medicion.id_ducto,
        medicion.Anillo,
        medicion.Espesor_min,
        medicion.Mediciones,
        medicion.direccion_minimo,
        medicion.observaciones,
        medicion.id_estado
    ];

    // Verificar que el objeto medicion tiene todos los campos necesarios
    if (!medicion.Fecha_medicion || !medicion.id_linea || !medicion.id_ducto || !medicion.Anillo ||
        !medicion.Espesor_min || !medicion.Mediciones || !medicion.direccion_minimo || !medicion.observaciones ||
        !medicion.id_estado) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE medicion SET Fecha_medicion = ?, id_linea = ?, id_ducto = ?, Anillo = ?, Espesor_min = ?, Mediciones = ?, direccion_minimo = ?, observaciones = ?, id_estado = ? WHERE Id_medicion = ?';

    dbConnection.query(sqlQuery, [...medicionObj, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la medición:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la medición.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna medición con el ID ${id} para actualizar.`
            });
        }

        res.status(200).json({
            message: `Medición con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteMedicion = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM medicion WHERE Id_medicion = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la medición:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la medición.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna medición con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Medición con ID ${id} eliminada correctamente.`
        });
    });
};


const getMedicionByIdDucto = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT m.* FROM medicion m WHERE m.id_ducto = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la medición por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la medición por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna medición con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};


module.exports = {
    getAllMediciones,
    getMedicionById,
    createNewMedicion,
    updateMedicion,
    deleteMedicion,
    getMedicionByIdDucto
};
