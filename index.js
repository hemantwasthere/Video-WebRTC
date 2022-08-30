const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors()) // enable all cors requests

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running.")
})

// listen for connections
io.on('connection', (socket) => {
    // emmiting me event to the client
    socket.emit('me', socket.id);

    // listening to disconnect event from the client and broadcasting emit callEnded
    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded")
    })

    // listening to callUser event from the client and emitting callUser
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name })
    })

    // listening to answerCall event from the client and emitting callAccepted
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})

// listening server to the port
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))