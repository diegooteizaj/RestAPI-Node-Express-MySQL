// tipoMaterialController.js

const dbConnection = require('../database/dbConnection');

const getAllTiposMaterial = (req, res) => {
    let sqlQuery = `SELECT * FROM tipo_material;`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getTipoMaterialById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT tm.* FROM tipo_material tm WHERE tm.id_tipo_material = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de material por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener el tipo de material por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún tipo de material con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};

const createNewTipoMaterial = (req, res) => {
    const tipoMaterial = req.body;
    const tipoMaterialObj = [tipoMaterial.nombre];

    // Verificar que el objeto tipoMaterial tiene todos los campos necesarios
    if (!tipoMaterial.nombre) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'INSERT INTO tipo_material (nombre) VALUES (?)';

    dbConnection.query(sqlQuery, tipoMaterialObj, (err, result) => {
        if (err) {
            console.error('Error al insertar el tipo de material:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el tipo de material. ',
                errorConsola: err 
            });
        }

        res.status(201).json({
            message: 'Tipo de material creado correctamente.',
            insertedTipoMaterialId: result.insertId
        });
    });
};

const updateTipoMaterial = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const tipoMaterial = req.body;
    const tipoMaterialObj = [tipoMaterial.nombre];

    // Verificar que el objeto tipoMaterial tiene todos los campos necesarios
    if (!tipoMaterial.nombre) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE tipo_material SET nombre = ? WHERE id_tipo_material = ?';

    dbConnection.query(sqlQuery, [tipoMaterialObj[0], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el tipo de material:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el tipo de material.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: 'No se encontró ningún tipo de material para actualizar con el ID proporcionado.'
            });
        }

        res.status(200).json({
            message: `Tipo de material con ID ${id} actualizado correctamente.`
        });
    });
};

const deleteTipoMaterial = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Ingrese un parámetro válido.'
        });
    }

    const sqlQuery = 'DELETE FROM tipo_material WHERE id_tipo_material = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el tipo de material:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el tipo de material.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún tipo de material con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Tipo de material con ID ${id} eliminado correctamente.`
        });
    });
};

module.exports = {
    getAllTiposMaterial,
    getTipoMaterialById,
    createNewTipoMaterial,
    updateTipoMaterial,
    deleteTipoMaterial
};
