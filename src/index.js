const express = require('express');
const cors = require('cors');
const dbConnection = require('../config/db');

//se crea el servidor
const app = express();

//conexion a la base de datos
dbConnection();

//habilitar cors
app.use(cors());

//habilitar express.json()
app.use(express.json());


const Port = process.env.PORT || 4000;

//rutas de los modulos 
app.use("/api/usuarios", require("../routes/usuarioRoutes"))
app.use("/api/auth", require("../routes/authRoutes"))
app.use("/api/clientes", require("../routes/clienteRoutes"))
app.use("/api/proveedores", require("../routes/proveedorRoutes"))

app.listen(Port, () => {
console.log('Server started');
});
