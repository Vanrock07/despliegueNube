const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //leer el header del token
    const token = req.header("x-auth-token");

    //verificar si hay token
    if (!token) return res.status(400).json({msg:"Access denied. No token provided"});

    //verificar si el token es valido
    try {
        const decoded = jwt.verify(token, process.env.SECRETA);
        req.user = decoded.user;
        next();
    } catch (error) {

            res.status(400).json({msg:"Access denied. Invalid token."});
    }
}