const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/index');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
        console.log(user);
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use('jwt-auth', jwtStrategy);
