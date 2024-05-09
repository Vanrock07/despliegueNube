const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check}= require('express-validator');


//api/usuarios
router.post("/", [
    check("nombres", "campo obligatorio").not().isEmpty(),
    check("email", "ingrese un email valido").isEmail(),
    check("password", "mínimo 10 caractéres").isLength({min: 10,}),

],
    usuarioController.createUser
);

module.exports = router;