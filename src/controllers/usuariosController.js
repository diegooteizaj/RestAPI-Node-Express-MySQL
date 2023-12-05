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
        res.status(400).json({ error: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ codigoError, codigoOk, idRol });
      }
    });
  };
  





module.exports = {
    getUsuarios,
    obtenerUsuario
};




