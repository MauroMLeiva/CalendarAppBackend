const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    return res.json({
        ok: true,
        events,
    });
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.json({
            ok: true,
            savedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'createEvent Error',
        });
    }
};

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No event found with that ID',
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You cant update this event',
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        res.json({
            ok: true,
            updatedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'updateEvent Error',
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No event found with that ID',
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You cant delete this event',
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'deleteEvent Error',
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
