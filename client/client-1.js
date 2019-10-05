const io = require('socket.io-client')('http://localhost:3000/');
const app = require('express')();
const bodyParser = require('body-parser');

io.on('connect', () => {
  console.log('connected!')

  io.send('asdsadssa');
  io.emit('asd', { a: 123 })
});

io.on('message', (data) => console.log('msg is', data))

console.log('start client');

app.use(bodyParser.json());

app.use('/send-msg', (req, res) => {
  const { event, room } = req.body;

  io.emit(event, room);

  io.to()

  res.json({ message: 'msg has been sent' });
});

app.listen(3002);
