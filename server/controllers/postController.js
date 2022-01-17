const jwt = require('jsonwebtoken');
const userDao = require('../dbs/dao/userDao');
const { Post, User, Comment, Like } = require('../dbs/models/index');

exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Comment,

                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    order: [[Comment, 'createdAt', 'ASC']],
                },
                {
                    model: Like,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC'],
            ],
        });
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
                {
                    model: Like,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
            ],

            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC'],
            ],
        });
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const { username } = req.params;
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    where: { username },
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Comment,

                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    order: [[Comment, 'createdAt', 'ASC']],
                },
                {
                    model: Like,

                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                    order: [[Comment, 'createdAt', 'ASC']],
                },
            ],

            // order: [['createdAt', 'DESC']],
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC'],
            ],
        });
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const { caption } = req.body;

        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const post = await Post.create({
            caption,
            userId: payload.id,
        });

        const user = await userDao.getById(payload.id);

        const resPost = {
            ...post.toJSON(),
            User: user,
            Comments: [],
            Likes: [],
        };

        res.status(201).json({ post: resPost });
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const { caption } = req.body;
        const { id } = req.params;

        const [affectedRow] = await Post.update(
            {
                caption,
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

        const post = await Post.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
                {
                    model: Like,

                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt'],
                            },
                        },
                    ],
                },
            ],
        });
        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Post.destroy({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (result === 0) {
            res.status(400).json({ message: 'cannot delete todo' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const result = await Like.create({
            userId: req.user.id,
            postId: postId,
        });
        res.status(201).send({ message: 'like success' });
    } catch (err) {
        next(err);
    }
};
exports.unLikePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const result = await Like.destroy({
            where: { postId: postId, userId: req.user.id },
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
