const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const setupDB = require('./helpers/setupDB');
const {
  toDosRoutes,
  authRoutes,
  orderRoutes
} = require('./routes');
const ioSetup = require('./socket');

ioSetup.call(io);
setupDB();

app
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/auth', authRoutes)
  .use('/to-dos', toDosRoutes)
  .use('/orders', orderRoutes)
  .use((err, req, res, next) => {
    res.status(500).json({ e: err.stack });
  });

server.listen(process.env.PORT || 3000);
