// // // Create Table
// const { sequelize } = require('./models/index');
// sequelize.sync({ force: true });

require('dotenv').config();
require('./middlewares/passport');
const express = require('express');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const aboutRoute = require('./routes/aboutRoute');
const commentRoute = require('./routes/commentRoute');
const uploadRoute = require('./routes/uploadRoute');

const cors = require('cors');
const app = express();
// app.use(express.limit('4M'));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/about', aboutRoute);
app.use('/comment', commentRoute);
app.use('/upload', uploadRoute);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    if (err.name === 'JsonWebTokenError') {
        code = 401;
    }
    if (err.name === 'TokenExpiredError') {
        code = 401;
    }
    if (process.env.NODE_ENV === 'development') {
        res.status(code).json({ message: err.message });
    } else {
        res.status(code.json({ message: 'something wrong' }));
    }
});

app.listen(8888, () => console.log('server running on port 8888'));
