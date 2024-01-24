const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');

const app = express();
const port = 8085;

app.use(morgan('dev'));

// Configuración específica de CORS para permitir solo solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
