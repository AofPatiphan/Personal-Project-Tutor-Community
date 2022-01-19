// // // Create Table
// const { sequelize } = require('./dbs/models/index');
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
const friendRoute = require('./routes/friendRoute');

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
app.use('/friend', friendRoute);

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

// *****socket.io*****

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

// const server = app.listen(8888, () => {
//     console.log('server is running on port 8888');
// });

// Initialize socket for the server
const jwt = require('jsonwebtoken');

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
    },
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        socket.userId = payload.id;
        console.log(payload);
        next();
    } catch (err) {
        socket.emit('token-expired', { message: 'token-expired' });
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //handle the new message event
    socket.on('send_message', async (data) => {
        console.log(data.message, data.userId);
        io.sockets.emit('receive_message', {
            message: [{ userId: data.userId, message: data.message }],
        });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
    });
});

// ไม่ใช้นะ*****************************
// *****Socket.io*****

// server.listen(4000, () => {
//     console.log('listening on port 4000');
// });

// // *****Socket.io*****
// app.listen(8888, () => console.log('server running on port 8888'));
server.listen(8888, () => console.log('server run on port 8888'));
