const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0123456789',
  database: 'mineraUltrasoundDatabase',
  port: '3306',
  multipleStatements: true, // Habilita el soporte para múltiples consultas
});

dbConnection.connect((error) => {
  if (error) {
    switch (error.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        console.error('Database connection was closed.');
        break;
      case 'ER_CON_COUNT_ERROR':
        console.error('Database has too many connections.');
        break;
      case 'ECONNREFUSED':
        console.error('Database connection was refused.');
        break;
      default:
        console.error('Database connection error:', error);
    }
  } else {
    console.log('Database connected');
  }
});

module.exports = dbConnection;
