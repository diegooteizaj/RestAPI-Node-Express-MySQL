const customerRoutes = require('./routes/customers.routes');
const tramosRoutes = require('./routes/tramos.routes');
const anillosRoutes = require('./routes/anillos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const proyectoRoutes = require('./routes/proyecto.routes');
const rolesRoutes = require('./routes/roles.routes');
const ubicacionRoutes = require('./routes/ubicacion.routes');
const sububicacionRoutes = require('./routes/sububicacion.routes');
const lineaRoutes = require('./routes/linea.routes');
const tipoMaterialRoutes = require('./routes/tipoMaterial.routes');
const estadosRoutes = require('./routes/estados.routes');
const inspectorRoutes = require('./routes/inspector.routes');
const metricasRoutes = require('./routes/metricas.routes');


const router = (app) => {
    app.use('/personas', customerRoutes);
    app.use('/tramos',tramosRoutes);
    app.use('/anillos',anillosRoutes);
    app.use('/usuarios',usuariosRoutes);
    app.use('/proyecto',proyectoRoutes);
    app.use('/roles',rolesRoutes);
    app.use('/ubicacion',ubicacionRoutes);
    app.use('/sububicacion',sububicacionRoutes);
    app.use('/linea',lineaRoutes);
    app.use('/tipoMaterial',tipoMaterialRoutes);
    app.use('/estados',estadosRoutes);
    app.use('/inspector',inspectorRoutes);
    app.use('/metricas',metricasRoutes);
};

module.exports = router;
