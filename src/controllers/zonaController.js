const dbConnection = require('../database/dbConnection');

const getZona = (req, res) => {
    let sqlQuery = 'SELECT * FROM Zona';
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};


module.exports = {
    getZona
};
