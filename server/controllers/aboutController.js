const jwt = require('jsonwebtoken');
const { About, User } = require('../dbs/models/index');
const { sequelize } = require('../dbs/models/index');
const { QueryTypes } = require('sequelize');

exports.getMyAbout = async (req, res, next) => {
    try {
        const about = await About.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.getUserBySearch = async (req, res, next) => {
    try {
        const { subject, level, gender, charactor } = req.body;

        const about = await sequelize.query(
            `SELECT u.id as id, u.first_name as firstName , u.last_name as lastName , u.username as username , 
            u.profile_url as profileUrl, a.caption as caption , a.charactor as charactor,a.subject as subject, 
            a.level as level , a.gender as gender , a.phone_number as phoneNumber, a.education_level as educationLevel 
            FROM users as u left join abouts as a on u.id = a.user_id
            where charactor = '${charactor}' or subject = '${subject}' or level = '${level}' or gender = '${gender}' `,
            { type: QueryTypes.SELECT }
        );
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.getAboutById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const about = await About.findOne({ where: { id } });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.createAbout = async (req, res, next) => {
    try {
        const { firstName, lastName, picture, charactor } = req.body;

        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const about = await About.create({
            firstName,
            lastName,
            picture,
            charactor,
            userId: payload.id,
        });
        res.status(201).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.updateAbout = async (req, res, next) => {
    try {
        const {
            caption,
            gender,
            charactor,
            subject,
            level,
            phoneNumber,
            educationLevel,
        } = req.body;
        const { id } = req.params;

        const [affectedRow] = await About.update(
            {
                caption,
                gender,
                charactor,
                subject,
                level,
                phoneNumber,
                educationLevel,
            },
            {
                where: {
                    userId: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update about' });
        }

        const user = await User.findOne({
            where: { id },
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

// exports.deleteAbout = async (req, res, next) => {
//     try {
//     } catch (err) {
//         next(err);
//     }
// };
