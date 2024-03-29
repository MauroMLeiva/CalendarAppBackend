const { response } = require('express');
const jwt = require('jsonwebtoken');

const JWTvalidator = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in petition',
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token',
        });
    }

    next();
};

module.exports = {
    JWTvalidator,
};
