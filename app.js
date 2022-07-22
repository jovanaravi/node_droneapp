const net = require('net');
var express = require('express');
var path = require('path');
var app = express();
const TCP_server = net.createServer();
var dgram = require('dgram');
var UDP_server = dgram.createSocket('udp4');
var serverr = require('http').Server(app);
var io = require('socket.io')(serverr);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use("/public", express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('login');
})

app.get('/lostp', (req, res) => {
    res.render('lostp');
})
app.get('/signup', (req, res) => {
    res.render('signup');
})
app.get('/login/Drone_c', (req, res) => {
    res.render('drone_control');
})
app.get('/test', (req, res) => {
    res.render('test');
})


TCP_server.on('connection', (conn) => {
    console.log('new client');
    conn.on('data', (data) => {
        var location = data.toString();
        var split_data = location.split(" ");
        var latitude = split_data[0];
        var longitude = split_data[1];
        console.log(location);
        console.log(latitude);
        console.log(longitude);
        io.emit('location', location);
    });

    io.on('connection', (socket) => {

        socket.on('command', (data) => {
            console.log(data);
            conn.write(data);

        });
    });

})

UDP_server.on('message', (data) => {

    io.emit('imagee', data.toString('base64'));
});

TCP_server.listen(5544, function() {

    console.log('TCP server is running...');
});

UDP_server.bind(1313, function() {
    console.log('UDP server is running...');
});

serverr.listen(5000, function() {
    console.log('server http...');
});