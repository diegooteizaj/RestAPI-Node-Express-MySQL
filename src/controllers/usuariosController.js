const dbConnection = require('../database/dbConnection');

const getUsuarios = (req, res) => {
    let sqlQuery = 
    `SELECT * FROM Usuarios;`
            ;
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

// // Middleware para parsear el cuerpo JSON de la solicitud
// app.use(express.json());

const obtenerUsuario = (req, res) => {
    const { nombreUsuario, password } = req.body;
  
    let sqlQuery = `
      CALL ObtenerUsuario(?, ?, @codigoError, @codigoOk, @idRol);
      SELECT @codigoError AS codigoError, @codigoOk AS codigoOk, @idRol AS idRol;
    `;
  
    dbConnection.query(sqlQuery, [nombreUsuario, password], (error, results) => {
      if (error) throw error;
  
      const [result, codes] = results;
  
      const { codigoError, codigoOk, idRol } = codes[0];
  
      console.log('Código de error:', codigoError);
      console.log('Código de éxito:', codigoOk);
      console.log('ID de Rol:', idRol);
  
      if (codigoError) {
        res.status(400).json({ error: 'Usuario no encontrado', codigoError: 1,codigoOk:-1,idRol:-1 });
      } else {
        res.status(200).json({ error:'', codigoError, codigoOk, idRol });
      }
    });
  };

  const getUsuarioById = (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            errorCode: 400,
            message: 'Debe ingresar un ID válido como parámetro.'
        });
    }

    const sqlQuery = 'SELECT u.* FROM usuario u WHERE u.id_Usuario = ?';

    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener los roles por ID:', error);
            return res.status(500).json({
                errorCode: 500,
                message: 'Error interno del servidor al obtener los roles por ID.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorCode: 404,
                message: `No se encontraron roles con el ID ${id}.`
            });
        }

        res.status(200).json(results);
    });
};



module.exports = {
    getUsuarios,
    obtenerUsuario,
    getUsuarioById
};




