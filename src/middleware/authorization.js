const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        let [type, token] = authorization.split(' ');

        if (type === 'Token' || type === 'Bearer' ) {
            const openToken = jwt.verify(token, process.env.SECRET);
            console.log('contenido del token', openToken);
            req.user = {
                id: openToken.user,
                email: openToken.email
            };

            next();
        } else {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
    } catch (error) {
        res.json({ message: 'Hubo un error', error: error.message });
    }
};
        

