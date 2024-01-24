/* 
    Event Routes
    host + /api/events
*/

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const router = express.Router();
const { JWTvalidator } = require('../middlewares/jwt-validator');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// Every petition below this line uses this middleware
router.use(JWTvalidator);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start time is required').custom(isDate),
        check('end', 'End time is required').custom(isDate),
        validateFields,
    ],
    createEvent
);

router.put(
    '/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start time is required').custom(isDate),
        check('end', 'End time is required').custom(isDate),
        validateFields,
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
