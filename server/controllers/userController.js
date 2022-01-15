const { User } = require('../models/index');

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
