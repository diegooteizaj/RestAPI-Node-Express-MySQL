const dbConnection = require('../database/dbConnection');

const getProyecto = (req, res) => {
    let sqlQuery = 'SELECT * FROM Proyecto';
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getProyectoById = (req, res) => {
    const id = req.params.id;

    // Verificar que el id pasado como parámetro es un número
    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT * FROM proyecto WHERE id_Proyecto = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al obtener el proyecto por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener el proyecto por ID.'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún proyecto con el ID ${id}.`
            });
        }

        res.status(200).json(result[0]);
    });
};

const createNewProyecto = (req, res) => {
    // Declare que almaceno el cuerpo de la solicitud en una constante
    const proyecto = req.body;

    // Verificar que el objeto proyecto tiene todos los campos necesarios
    if (!proyecto.id_Proyecto || !proyecto.Nombre_Empresa || !proyecto.Nombre_Proyecto) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    // Crear el objeto con los campos de la tabla llamando a la constante proyecto
    const proyectoObj = [
        proyecto.id_Proyecto,
        proyecto.Nombre_Empresa,
        proyecto.Nombre_Proyecto,
    ];

    // Definir la consulta SQL
    let sqlQuery = 'INSERT INTO proyecto (id_Proyecto, Nombre_Empresa, Nombre_Proyecto) VALUES (?, ?, ?)';

    // Ejecutar la consulta SQL
    dbConnection.query(sqlQuery, proyectoObj, (err, result) => {
        if (err) {
            console.error('Error al crear el proyecto:', err);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al crear el proyecto.',
                errorConsola:err,
            });
        }

        res.status(201).json({
            message: 'Proyecto creado con ID: ' + result.insertId
        });
    });
};


const updateProyecto = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const proyecto = req.body;
    const proyectoObj = [
        proyecto.Nombre_Empresa,
        proyecto.Nombre_Proyecto
    ];

    // Verificar que el objeto proyecto tiene todos los campos necesarios
    if (!proyecto.Nombre_Empresa || !proyecto.Nombre_Proyecto) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Todos los campos deben estar completos.'
        });
    }

    const sqlQuery = 'UPDATE proyecto SET Nombre_Empresa = ?, Nombre_Proyecto = ? WHERE id_Proyecto = ?';

    dbConnection.query(sqlQuery, [proyectoObj[0], proyectoObj[1], id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el proyecto:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al actualizar el proyecto.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún proyecto con el ID ${id} para actualizar.`
            });
        }

        res.status(200).json({
            message: `Proyecto con ID ${id} actualizado correctamente.`
        });
    });
};

const deleteProyecto = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'DELETE FROM proyecto WHERE id_Proyecto = ?';

    dbConnection.query(sqlQuery, [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el proyecto:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al eliminar el proyecto.'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontró ningún proyecto con el ID ${id} para eliminar.`
            });
        }

        res.status(200).json({
            message: `Proyecto con ID ${id} eliminado correctamente.`
        });
    });
};



module.exports = {
    getProyecto,
    getProyectoById,
    createNewProyecto,
    updateProyecto,
    deleteProyecto

};




