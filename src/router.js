const customerRoutes = require('./routes/customers.routes');

const router = (app) => {
    app.use('/personas', customerRoutes);
};

module.exports = router;
