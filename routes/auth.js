/* 
    User Routes / Auth
    host + /api/auth 
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { JWTvalidator } = require('../middlewares/jwt-validator');

router.post(
    '/new',
    [
        check('name', 'You must provide a valid name').not().isEmpty(),
        check('email', 'You must provide a valid email').isEmail(),
        check(
            'password',
            'Password needs to have at least 6 charactesrs'
        ).isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'You must provide a valid email').isEmail(),
        check(
            'password',
            'Password needs to have at least 6 charactesrs'
        ).isLength({ min: 6 }),
        validateFields,
    ],
    loginUser
);

router.get('/renew', JWTvalidator, renewToken);

module.exports = router;
