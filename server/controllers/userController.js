const { User } = require('../dbs/models/index');
const { Op } = require('sequelize');
const friendDao = require('../dbs/function/friendDao');

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
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${name}%` } },
                    { lastName: { [Op.like]: `%${name}%` } },
                ],
                [Op.not]: { firstName: req.user.firstName },
            },
        });
        const userId = users.map((user) => user.id);

        const mutualFriends = await friendDao.countMutualFriend({
            userId: req.user.id,
            friendsIds: userId,
        });

        const userWithMutual = users.map((user) => {
            return {
                ...user.toJSON(),
                mutualFriend: mutualFriends[user.id].length,
            };
        });
        res.status(200).json({ user: userWithMutual });
        // res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
