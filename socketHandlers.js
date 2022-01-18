module.exports = (socket, roomId) => {
    socket.on("send-changes", (delta) => {
        console.log(delta)
        socket.broadcast.to(roomId).emit("receive-changes", delta)
    })
}
