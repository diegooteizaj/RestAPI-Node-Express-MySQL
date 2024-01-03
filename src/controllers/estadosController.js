// estadosController.js

const dbConnection = require('../database/dbConnection');

const getAllEstados = (req, res) => {
    let sqlQuery = `SELECT * FROM estados;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getEstadoById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT e.* FROM estados e WHERE e.id_estado = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el estado por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener el estado por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún estado con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewEstado = (req, res) => {
    const estado = req.body;
    const estadoObj = [estado.TipoEstado, estado.DescripcionEstado];

    // Verificar que el objeto estado tiene todos los campos necesarios
    if (!estado.TipoEstado || !estado.DescripcionEstado) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO estados (TipoEstado, DescripcionEstado) VALUES (?, ?)';

    dbConnection.query(sqlQuery, estadoObj, (err, result) => {
        if (err) {
            console.error('Error al insertar el estado:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el estado. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Estado creado correctamente.',
            insertedEstadoId: result.insertId
        });
    });
};

const updateEstado = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const estado = req.body;
    const estadoObj = [estado.TipoEstado, estado.DescripcionEstado];

    // Verificar que el objeto estado tiene todos los campos necesarios
    if (!estado.TipoEstado || !estado.DescripcionEstado) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE estados SET TipoEstado = ?, DescripcionEstado = ? WHERE id_estado = ?';

    dbConnection.query(sqlQuery, [estadoObj[0], estadoObj[1], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el estado:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el estado.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ningún estado para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Estado con ID ${id} actualizado correctamente.`
        });
    });
};

const deleteEstado = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM estados WHERE id_estado = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el estado:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el estado.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún estado con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Estado con ID ${id} eliminado correctamente.`
        });
    });
};

module.exports = {
    getAllEstados,
    getEstadoById,
    createNewEstado,
    updateEstado,
    deleteEstado
};
