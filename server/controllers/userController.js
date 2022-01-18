const { User } = require('../dbs/models/index');
const { Op } = require('sequelize');

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.getUserByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        console.log(1);
        console.log(req.user.firstName);
        console.log(1);
        const user = await User.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${name}%` } },
                    { lastName: { [Op.like]: `%${name}%` } },
                ],
                [Op.not]: { firstName: req.user.firstName },
            },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
