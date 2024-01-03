// tasasController.js

const dbConnection = require('../database/dbConnection');

const getAllTasas = (req, res) => {
    let sqlQuery = `SELECT * FROM tasas;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getTasaById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT t.* FROM tasas t WHERE t.Id_TASA = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la tasa por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener la tasa por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna tasa con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewTasa = (req, res) => {
    const tasa = req.body;
    const tasaObj = [
        tasa.id_ducto,
        tasa.Fecha_inicio,
        tasa.Fecha_fin,
        tasa.Hrs_op_acum,
        tasa.Ton_acum,
        tasa.Valor_tasa,
        tasa.Metodo
    ];

    // Verificar que el objeto tasa tiene todos los campos necesarios
    if (!tasa.id_ducto || !tasa.Fecha_inicio || !tasa.Fecha_fin || !tasa.Hrs_op_acum || 
        !tasa.Ton_acum || !tasa.Valor_tasa || !tasa.Metodo) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO tasas (id_ducto, Fecha_inicio, Fecha_fin, Hrs_op_acum, Ton_acum, Valor_tasa, Metodo) VALUES (?, ?, ?, ?, ?, ?, ?)';

    dbConnection.query(sqlQuery, tasaObj, (err, result) => {
        if (err) {
            console.error('Error al insertar la tasa:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear la tasa. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Tasa creada correctamente.',
            insertedTasaId: result.insertId
        });
    });
};

const updateTasa = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const tasa = req.body;
    const tasaObj = [
        tasa.id_ducto,
        tasa.Fecha_inicio,
        tasa.Fecha_fin,
        tasa.Hrs_op_acum,
        tasa.Ton_acum,
        tasa.Valor_tasa,
        tasa.Metodo
    ];

    // Verificar que el objeto tasa tiene todos los campos necesarios
    if (!tasa.id_ducto || !tasa.Fecha_inicio || !tasa.Fecha_fin || !tasa.Hrs_op_acum || 
        !tasa.Ton_acum || !tasa.Valor_tasa || !tasa.Metodo) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE tasas SET id_ducto = ?, Fecha_inicio = ?, Fecha_fin = ?, Hrs_op_acum = ?, Ton_acum = ?, Valor_tasa = ?, Metodo = ? WHERE Id_TASA = ?';

    dbConnection.query(sqlQuery, [...tasaObj, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar la tasa:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar la tasa.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna tasa para actualizar con el ID proporcionado.`
            });
        }

        res.status(200).json({
            message: `Tasa con ID ${id} actualizada correctamente.`
        });
    });
};

const deleteTasa = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM tasas WHERE Id_TASA = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la tasa:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar la tasa.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ninguna tasa con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Tasa con ID ${id} eliminada correctamente.`
        });
    });
};

module.exports = {
    getAllTasas,
    getTasaById,
    createNewTasa,
    updateTasa,
    deleteTasa
};
