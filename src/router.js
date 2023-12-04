const customerRoutes = require('./routes/customers.routes');
const tramosRoutes = require('./routes/tramos.routes');
const anillosRoutes = require('./routes/anillos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const router = (app) => {
    app.use('/personas', customerRoutes);
    app.use('/tramos',tramosRoutes);
    app.use('/anillos',anillosRoutes);
    app.use('/usuarios',usuariosRoutes);
};

module.exports = router;
