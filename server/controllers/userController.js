const { User } = require('../dbs/models/index');

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
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
