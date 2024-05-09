const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


//funcion para autenticacion del usuario

exports.authUser = async (req, res) => {

    //validar errores de validacion
    const valid = validationResult(req);

    if (!valid.isEmpty()) {
        return res.status(400).json({ valid: valid.array() });
    }

    const { email, password } = req.body;

    try {
        //verificar si el usuario existe
        let user = await Usuarios.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "El usuario no existe" });
        } else {

            //validacion del password
            let validPassword = await bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ msg: "Password incorrecto" });
            }
        }

        //creacion y firma del token    

        const payload = {
            usuario: { id: user.id },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 43200
            },

            (error, token) => {
                if (error) throw error;
                //mensaje de confirmacion
                res.json({ token });

            }
        );

    } catch (err) {
        console.log("error de validacion");
        console.log(err);
        res.status(400).json({ message: 'Error al buscar el usuario' });
    }
}
exports.usuarioAutenticado = async (req, res) => {
    try {

        let user = await Usuarios.findById(req.user.id);
        res.json({ user });


    } catch (err) {
        res.status(500).json({ message: "Error" });

    }
}


