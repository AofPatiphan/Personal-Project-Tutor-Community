const jwt = require('jsonwebtoken');
const userDao = require('../dbs/dao/userDao');
const { Op } = require('sequelize');

const { Conversation } = require('../dbs/models/index');

//new conv
exports.createConversation = async (req, res, next) => {
    try {
        const newConversation = new Conversation({
            member: [req.body.senderId, req.body.receiverId],
        });
    } catch (err) {
        next(err);
    }
};

//get conv of a user
