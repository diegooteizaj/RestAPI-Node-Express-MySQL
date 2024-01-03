// metricasController.js

const dbConnection = require('../database/dbConnection');

const getAllMetricas = (req, res) => {
    let sqlQuery = `SELECT * FROM metricas;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getMetricasById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT m.* FROM metricas m WHERE m.id_linea = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener las métricas por ID de línea:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener las métricas por ID de línea.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontraron métricas con el ID de línea ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewMetricas = (req, res) => {
    const metricas = req.body;
    const metricasObj = [metricas.Fecha, metricas.id_linea, metricas.Hrs_operativas, metricas.Tonelaje];

    // Verificar que el objeto metricas tiene todos los campos necesarios
    if (!metricas.Fecha || !metricas.id_linea || !metricas.Hrs_operativas || !metricas.Tonelaje) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO metricas (Fecha, id_linea, Hrs_operativas, Tonelaje) VALUES (?, ?, ?, ?)';

    dbConnection.query(sqlQuery, metricasObj, (err, result) => {
        if (err) {
            console.error('Error al insertar las métricas:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear las métricas. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Métricas creadas correctamente.',
            insertedMetricasId: result.insertId
        });
    });
};

const updateMetricas = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const metricas = req.body;
    const metricasObj = [metricas.Fecha, metricas.Hrs_operativas, metricas.Tonelaje];

    // Verificar que el objeto metricas tiene todos los campos necesarios
    if (!metricas.Fecha || !metricas.Hrs_operativas || !metricas.Tonelaje) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE metricas SET Fecha = ?, Hrs_operativas = ?, Tonelaje = ? WHERE id_linea = ?';

    dbConnection.query(sqlQuery, [metricasObj[0], metricasObj[1], metricasObj[2], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar las métricas:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar las métricas.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontraron métricas para actualizar con el ID de línea proporcionado.`
            });
        }

        res.status(200).json({
            message: `Métricas con ID de línea ${id} actualizadas correctamente.`
        });
    });
};

const deleteMetricas = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM metricas WHERE id_linea = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar las métricas:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar las métricas.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontraron métricas con el ID de línea ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Métricas con ID de línea ${id} eliminadas correctamente.`
        });
    });
};

module.exports = {
    getAllMetricas,
    getMetricasById,
    createNewMetricas,
    updateMetricas,
    deleteMetricas
};
