const { User, About } = require('../dbs/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            profileUrl,
        } = req.body;

        if (firstName === '')
            return res.status(400).json({ message: 'firstname is require' });

        if (lastName === '')
            return res.status(400).json({ message: 'lastname is require' });

        if (username === '')
            return res.status(400).json({ message: 'username is require' });

        if (email === '')
            return res.status(400).json({ message: 'email is require' });

        if (password === '' || password === null || password === undefined)
            return res.status(400).json({ message: 'Please input password' });

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Password is not match' });

        const existUsername = await User.findOne({ where: { username } });
        if (existUsername) {
            return res
                .status(400)
                .json({ message: 'username is already in use' });
        }
        const existEmail = await User.findOne({ where: { email } });

        if (existEmail) {
            return res.status(400).json({ message: 'email is already in use' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            profileUrl,
            password: hashed,
        });

        await About.create({
            userId: user.id,
        });

        res.json({ message: 'user created', username, email });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'username or password is incorrect' });
        }

        // jwt
        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        res.json({ message: 'Login success', token });
    } catch (err) {
        next(err);
    }
};

// exports.authenticate = async (req, res, next) => {
//     try {
//         const { authorization } = req.headers;
//         if (!authorization || !authorization.startsWith('Bearer')) {
//             return res.status(401).json({ message: 'you are unauthenticated' });
//         }

//         const token = authorization.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({ message: 'you are unauthenticated' });
//         }

//         const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         const user = await User.findOne({ where: { id: payload.id } });
//         if (!user)
//             return res.status(401).json({ message: 'you are unauthenticated' });

//         req.user = user;
//         next();
//     } catch (err) {
//         next(err);
//     }
// };
