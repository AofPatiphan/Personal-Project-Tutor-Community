const jwt = require('jsonwebtoken');
const { About } = require('../models/index');

exports.getMyAbout = async (req, res, next) => {
    try {
        const about = await About.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.getAboutById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const about = await About.findOne({ where: { id } });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.createAbout = async (req, res, next) => {
    try {
        const { firstName, lastName, picture, charactor } = req.body;

        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const about = await About.create({
            firstName,
            lastName,
            picture,
            charactor,
            userId: payload.id,
        });
        res.status(201).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.updateAbout = async (req, res, next) => {
    try {
        const { firstName, lastName, picture, charactor } = req.body;
        const { id } = req.params;

        const [affectedRow] = await About.update(
            {
                firstName,
                lastName,
                picture,
                charactor,
            },
            {
                where: {
                    id,
                    userId: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update todo' });
        }

        const about = await About.findOne({ where: { id } });

        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.deleteAbout = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
