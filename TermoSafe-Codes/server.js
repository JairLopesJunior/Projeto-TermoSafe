'use strict'

const http = require('http')
const path = require('path')
const EventEmitter = require('events')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const events = new EventEmitter()

app.use(express.static(path.join(__dirname, 'public')))

io.on('connect', socket => {
  events.on('temperature', value => {
    socket.emit('temperature', value)
  })
})

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600
});
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function () {
  console.log('connection is jair');
});

parser.on('data', function (data) {
  let temp = parseInt(data) + " °C";
  console.log(temp);
  io.emit('temp', data.toString());
  setInterval(() => {
});    
const temperature = parseInt(data)
  events.emit('temperature', temperature)
}, 1000);

server.listen(port, () => console.log(`Listening on port ${port}`))

