const jwt = require('jsonwebtoken');
const { Post } = require('../models/index');

exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
        console.log(posts);
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ where: { id, userId: req.user.id } });
        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const { postContent } = req.body;

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
            postContent,
            userId: payload.id,
        });
        console.log(post);
        res.status(201).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const { postContent } = req.body;
        const { id } = req.params;

        const [affectedRow] = await Post.update(
            {
                postContent,
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

        const post = await Post.findOne({ where: { id } });

        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.updateLike = async (req, res, next) => {
    try {
        const { like } = req.body;
        const { id } = req.params;

        const [affectedRow] = await Post.update(
            {
                like,
            },
            {
                where: {
                    id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update todo' });
        }

        const post = await Post.findOne({ where: { id } });

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
