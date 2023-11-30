const customerRoutes = require('./routes/customers.routes');
const tramosRoutes = require('./routes/tramos.routes')

const router = (app) => {
    app.use('/personas', customerRoutes);
    app.use('/tramos',tramosRoutes);
};

module.exports = router;
