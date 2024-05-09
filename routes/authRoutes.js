const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check}= require('express-validator');
const auth = require('../middlewares/authMiddleware');


//autenticacion de usuario

router.post("/", [
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Minimo 10 caracteres').isLength({min:10,}),

],
authController.authUser
);

router.get("/", auth, authController.usuarioAutenticado)

module.exports = router;