var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , connections = {}

server.listen(8000)

app.configure(function () {
    app.use(express.static(__dirname))
})

io.sockets.on('connection', function (socket) {

    socket.on('send', function(data) {
        console.log('\nActivity:', data.title)

        var activity = "<div class='activity'>"
          + "<p>" + data.title + "</p>"
          + "<p>" + data.description + "</p>"
          + "</div>";

        socket.broadcast.emit('getactivity', activity)
    })

    socket.on('disconnect', function () {
        console.log('DISCONNECT')
    })

    socket.on('activityUpdated', function () {
        socket.broadcast.emit('newactivity')
    })

    socket.on('username', function(username) {
      connections[username] = socket
      console.log(username)
  })


    
}) 