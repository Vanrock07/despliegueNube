const mongoose = require('mongoose');
require('dotenv').config({path: "variables.env"});

//conexion con mongo db
const dbConnection = async () => {

    mongoose
        .connect(process.env.DB_MONGO)
        .then(() => console.log('Connected to Mongo DB'))
        .catch((err) => console.log(err));

};
module.exports = dbConnection;