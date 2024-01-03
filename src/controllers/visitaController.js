// visitaController.js

const dbConnection = require('../database/dbConnection');

const getAllVisitas = (req, res) => {
    let sqlQuery = `SELECT * FROM visita;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getVisitaById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT v.* FROM visita v WHERE v.id_visita = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la visita por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la visita por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna visita con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewVisita = (req, res) => {
    const visita = req.body;
    const visitaObj = [
        visita.fecha_visita,
        visita.id_inspector,
        visita.id_ducto,
        visita.id_medicion,
        visita.observaciones
    ];

    // Verificar que el objeto visita tiene todos los campos necesarios
    if (!visita.fecha_visita || !visita.id_inspector || !visita.id_ducto || !visita.id_medicion || !visita.observaciones) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO visita (fecha_visita, id_inspector, id_ducto, id_medicion, observaciones) VALUES (?, ?, ?, ?, ?)';

    dbConnection.query(sqlQuery, visitaObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la visita:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la visita. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Visita creada correctamente.',
            insertedVisitaId: result.insertId
        });
    });
};

const updateVisita = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const visita = req.body;
    const visitaObj = [
        visita.fecha_visita,
        visita.id_inspector,
        visita.id_ducto,
        visita.id_medicion,
        visita.observaciones
    ];

    // Verificar que el objeto visita tiene todos los campos necesarios
    if (!visita.fecha_visita || !visita.id_inspector || !visita.id_ducto || !visita.id_medicion || !visita.observaciones) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE visita SET fecha_visita = ?, id_inspector = ?, id_ducto = ?, id_medicion = ?, observaciones = ? WHERE id_visita = ?';

    dbConnection.query(sqlQuery, [...visitaObj, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la visita:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la visita.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna visita con el ID ${id} para actualizar.`
            });
        }

        res.status(200).json({
            message: `Visita con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteVisita = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM visita WHERE id_visita = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la visita:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la visita.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna visita con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Visita con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllVisitas,
    getVisitaById,
    createNewVisita,
    updateVisita,
    deleteVisita
};
