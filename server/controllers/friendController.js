const { Friend, User } = require('../dbs/models/index');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
    try {
        const friends = await Friend.findAll({
            where: {
                status: 'FRIEND',
                [Op.or]: [
                    { request_to_id: req.user.id },
                    { request_by_id: req.user.id },
                ],
            },
        });
        const friendsIds = friends.reduce((acc, item) => {
            if (req.user.id === item.request_by_id) {
                acc.push(item.request_to_id);
            } else {
                acc.push(item.request_by_id);
            }
            return acc;
        }, []);
        const users = await User.findAll({
            where: { id: friendsIds },
            attributes: {
                excludes: ['password'],
            },
        });
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id1, id2 } = req.params;
        // console.log(id1);
        // console.log(id2);
        const friend = await Friend.findOne({
            where: {
                [Op.or]: [
                    { request_by_id: id1, request_to_id: id2 },
                    { request_by_id: id2, request_to_id: id1 },
                ],
            },
        });
        res.status(200).json({ friend });
    } catch (err) {
        next(err);
    }
};

exports.request = async (req, res, next) => {
    try {
        const { requestToId, requestById } = req.body;
        // const { id } = req.params.id;
        const result = await Friend.create({
            status: 'PENDONG',
            request_to_id: requestToId,
            request_by_id: requestById,
        });
        res.status(201).send({ message: 'success' });
    } catch (err) {
        next(err);
    }
};

// const { caption, pictureUrl } = req.body;

//         const { authorization } = req.headers;
//         if (!authorization || !authorization.startsWith('Bearer')) {
//             return res.status(401).json({ message: 'you are unauthenticated' });
//         }

//         const token = authorization.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({ message: 'you are unauthenticated' });
//         }

//         const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         const post = await Post.create({
//             caption,
//             pictureUrl,
//             userId: payload.id,
//         });

//         const user = await userDao.getById(payload.id);

//         const resPost = {
//             ...post.toJSON(),
//             User: user,
//             Comments: [],
//             Likes: [],
//         };

//         res.status(201).json({ post: resPost });

exports.cancelRequest = async (req, res, next) => {
    try {
        const { id1, id2 } = req.params;
        console.log(id1);
        console.log(id2);
        const result = await Friend.destroy({
            where: {
                [Op.or]: [
                    { request_by_id: id1, request_to_id: id2 },
                    { request_by_id: id2, request_to_id: id1 },
                ],
            },
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.acceptRequest = async (req, res, next) => {
    try {
        const { id1, id2 } = req.params;

        const friend = await Friend.update(
            { status: 'FRIEND' },
            {
                where: {
                    [Op.or]: [
                        { request_by_id: id1, request_to_id: id2 },
                        { request_by_id: id2, request_to_id: id1 },
                    ],
                },
            }
        );
        res.status(200).json({ friend });
    } catch (err) {
        next(err);
    }
};

exports.rejectRequest = async (req, res, next) => {
    try {
        // const { username } = req.params;
        // const user = await User.findOne({ where: { username } });
        // res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
