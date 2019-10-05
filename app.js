const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const setupDB = require('./helpers/setupDB');
const { toDosRoutes } = require('./routes');

io.on('connection', (socket) => {
  console.log('client', socket.id, 'connected')
  socket.on('message', (data) => {
    console.log(data);

    socket.broadcast.emit('message', 'broadcast');
    io.emit('message', 'io glob');
  });

  socket.on('join', (data) => {
    const room = data;
    console.log('data', data)

    socket.join(room);

    console.log('connected to', room, 'user', socket.id);

    io.clients((err, clients) => console.log('general', clients));
    io.in(room).clients((err, clients) => console.log('room', clients));
  })
});

setupDB();

// setTimeout(() => {
//
// }, 1000);

app
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/to-dos', toDosRoutes)
  .use('/conns', (req, res, next) => {
    // res.json({ data: io.sockets })
    try {
      fs.asd()
    } catch (e) {
      next(e)
    }
  })
  .use((err, req, res, next) => {
    return res.status(500).json({ e: err.stack });
  });

server.listen(process.env.PORT || 3000);
