const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {

    //buscar errores
    const valid = validationResult(req);
    if (!valid.isEmpty()) {
        return res.status(400).json({ valid: valid.array() });
    }

    const { email, password } = req.body;

    try {
        //verificar que el usuario es unico
        let user = await Usuarios.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        //crear el nuevo usuario
        user = new Usuarios(req.body);

        //crear password
        user.password = await bcryptjs.hash(password, 12);
        //guardar el usuario
        await user.save();

        //firma del token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600
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

};