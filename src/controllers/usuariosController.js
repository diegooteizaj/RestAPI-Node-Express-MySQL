const dbConnection = require('../database/dbConnection');

const getUsuarios = (req, res) => {
    let sqlQuery = 
    `SELECT * FROM Usuario;`
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


const createNewUsuario = (req, res) => {
  const usuario = req.body;

  // Verificar que el objeto usuario tiene todos los campos necesarios
  if (!usuario.id_Usuario || !usuario.nombre || !usuario.correo || !usuario.password || !usuario.id_rol) {
      return res.status(400).json({
          errorCode: 400,
          message: 'Todos los campos deben estar completos.'
      });
  }

  const usuarioObj = [
      usuario.id_Usuario,
      usuario.nombre,
      usuario.correo,
      usuario.password,
      usuario.id_rol
  ];

  const sqlQuery = 'INSERT INTO usuario (id_Usuario, nombre, correo, password, id_rol) VALUES (?, ?, ?, ?, ?)';

  dbConnection.query(sqlQuery, usuarioObj, (err, result) => {
      if (err) {
          console.error('Error al insertar el usuario:', err);
          return res.status(500).json({
              errorCode: 500,
              message: 'Error interno del servidor al crear el usuario.',
              errorConsola: err
          });
      }

      res.status(201).json({
          message: 'Usuario creado correctamente.',
          insertedUserId: result.insertId
      });
  });
};


const updateUsuario = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
      return res.status(400).json({
          errorCode: 400,
          message: 'Debe ingresar un ID válido como parámetro.'
      });
  }

  const usuario = req.body;
  const usuarioObj = [
      usuario.nombre,
      usuario.correo,
      usuario.password,
      usuario.id_rol
  ];

  // Verificar que el objeto usuario tiene todos los campos necesarios
  if (!usuario.nombre || !usuario.correo || !usuario.password || !usuario.id_rol) {
      return res.status(400).json({
          errorCode: 400,
          message: 'Todos los campos deben estar completos.'
      });
  }

  const sqlQuery = 'UPDATE usuario SET nombre = ?, correo = ?, password = ?, id_rol = ? WHERE id_Usuario = ?';

  dbConnection.query(sqlQuery, [usuarioObj[0], usuarioObj[1], usuarioObj[2], usuarioObj[3], id], (error, result) => {
      if (error) {
          console.error('Error al actualizar el usuario:', error);
          return res.status(500).json({
              errorCode: 500,
              message: 'Error interno del servidor al actualizar el usuario.'
          });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({
              errorCode: 404,
              message: `No se encontró ningún usuario con el ID ${id} para actualizar.`
          });
      }

      res.status(200).json({
          message: `Usuario con ID ${id} actualizado correctamente.`
      });
  });
};


const deleteUsuario = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
      return res.status(400).json({
          errorCode: 400,
          message: 'Debe ingresar un ID válido como parámetro.'
      });
  }

  const sqlQuery = 'DELETE FROM usuario WHERE id_Usuario = ?';

  dbConnection.query(sqlQuery, [id], (error, result) => {
      if (error) {
          console.error('Error al eliminar el usuario:', error);
          return res.status(500).json({
              errorCode: 500,
              message: 'Error interno del servidor al eliminar el usuario.'
          });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({
              errorCode: 404,
              message: `No se encontró ningún usuario con el ID ${id} para eliminar.`
          });
      }

      res.status(200).json({
          message: `Usuario con ID ${id} eliminado correctamente.`
      });
  });
};


module.exports = {
    getUsuarios,
    obtenerUsuario,
    getUsuarioById,
    createNewUsuario,
    updateUsuario,
    deleteUsuario
};




