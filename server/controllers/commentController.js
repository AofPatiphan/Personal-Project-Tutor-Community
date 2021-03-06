const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { Comment, Post, User, Like } = require('../dbs/models/index');

exports.getAllComment = async (req, res, next) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json({ comments });
    } catch (err) {
        next(err);
    }
};

exports.getCommentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findOne({
            where: { id, userId: req.user.id },
        });
        res.status(200).json({ comment });
    } catch (err) {
        next(err);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const { commentContent } = req.body;
        const { id } = req.params;

        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const pId = await Post.findOne({
            where: { id },
        });

        const comment = await Comment.create({
            commentContent,
            userId: payload.id,
            postId: pId.id,
        });
        res.status(201).json({ comment });
    } catch (err) {
        next(err);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const { commentContent } = req.body;
        const { id } = req.params;

        const [affectedRow] = await Comment.update(
            {
                commentContent,
            },
            {
                where: {
                    id,
                    userId: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update comment' });
        }

        const comment = await Comment.findOne({ where: { id } });

        res.status(200).json({ comment });
    } catch (err) {
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Comment.destroy({
            where: {
                id,
                // userId: req.user.id,
            },
        });
        if (result === 0) {
            res.status(400).json({ message: 'cannot delete comment' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
