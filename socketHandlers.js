const { _joinSocketRoom, _broadCastChangesToRoom, _handleSocketDisconnect } = require("./controllers/virtualSpaceControllers")

// const onGoingRooms = {}

module.exports = (socket) => {
	console.log("Socket connected: " + socket.id)
	// start listening for new users requesting to join the room
	socket.on("join-room", (data) => {
		console.log("User [" + data.username + ":"+socket.id+"] added to room [" + data.roomId + "]")
		// add them to the room
		socket.join(data.roomId)
		// const room = onGoingRooms[roomId]
		// if (room) {
		// 	// this room is already ongoing (someone is in it)
		// 	onGoingRooms[roomId].users.push({id: userId, socketId})
		// }
		// else { 
		// 	// this room is offline, so bring it online
		// 	onGoingRooms[roomId] = {id: roomId, users: [{id: userId, socketId}]} 
		// }

		// broadcast to the whole room that this user joined
		socket.to(data.roomId).emit("user-joined", socket.id, data)
	})

	// start listening for user data sent by that user to a new user
	socket.on('user-joined ack', (socketid, data) => { 
		socket.to(socketid).emit("join-room ack", data)
	})

	socket.on('disconnect', () => {
		console.log("User disconnected: ", socket.id)
	})

	// socket.on("send-changes", ({ roomId, delta }) => {
	// 	_broadCastChangesToRoom(socket, roomId, delta)
	// })
}
