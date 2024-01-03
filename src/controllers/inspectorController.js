// inspectorController.js

const dbConnection = require('../database/dbConnection');

const getAllInspectores = (req, res) => {
    let sqlQuery = `SELECT * FROM inspector;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getInspectorById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT i.* FROM inspector i WHERE i.id_inspector = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el inspector por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener el inspector por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún inspector con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewInspector = (req, res) => {
    const inspector = req.body;
    const inspectorObj = [inspector.nombre, inspector.rut, inspector.Telefono, inspector.Visita];

    // Verificar que el objeto inspector tiene todos los campos necesarios
    if (!inspector.nombre || !inspector.rut || !inspector.Telefono || !inspector.Visita) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO inspector (nombre, rut, Telefono, Visita) VALUES (?, ?, ?, ?)';

    dbConnection.query(sqlQuery, inspectorObj, (err, result) => {
        if (err) {
            console.error('Error al insertar el inspector:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el inspector. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Inspector creado correctamente.',
            insertedInspectorId: result.insertId
        });
    });
};

const updateInspector = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const inspector = req.body;
    const inspectorObj = [inspector.nombre, inspector.rut, inspector.Telefono, inspector.Visita];

    // Verificar que el objeto inspector tiene todos los campos necesarios
    if (!inspector.nombre || !inspector.rut || !inspector.Telefono || !inspector.Visita) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE inspector SET nombre = ?, rut = ?, Telefono = ?, Visita = ? WHERE id_inspector = ?';

    dbConnection.query(sqlQuery, [inspectorObj[0], inspectorObj[1], inspectorObj[2], inspectorObj[3], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el inspector:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el inspector.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ningún inspector para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Inspector con ID ${id} actualizado correctamente.`
        });
    });
};

const deleteInspector = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM inspector WHERE id_inspector = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el inspector:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el inspector.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún inspector con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Inspector con ID ${id} eliminado correctamente.`
        });
    });
};

module.exports = {
    getAllInspectores,
    getInspectorById,
    createNewInspector,
    updateInspector,
    deleteInspector
};
