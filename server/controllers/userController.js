const { User, About } = require('../dbs/models/index');
const { Op } = require('sequelize');
const friendDao = require('../dbs/function/friendDao');

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                excludes: ['password'],
            },
        });
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({
            where: { username },
            attributes: {
                exclude: ['password'],
            },
            include: [
                {
                    model: About,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

// ใช้ตอน search จากชื่อ
exports.getUserByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (name) {
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${name}%` } },
                        { lastName: { [Op.like]: `%${name}%` } },
                    ],
                    [Op.not]: { firstName: req.user.firstName },
                },
                attributes: {
                    excludes: ['password'],
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
        } else {
            res.status(200).json({ user: [] });
        }
        // res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
