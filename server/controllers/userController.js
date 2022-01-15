const { User } = require('../models/index');

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
