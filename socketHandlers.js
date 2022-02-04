const { db } = require("./firebase")

module.exports = (socket) => {
	console.log("Socket connected: " + socket.id)

	// start listening for new users requesting to join the room
	socket.on("join-room", async ({ username, userId, collabId, roomId }) => {
		console.log("User [" + username + ":"+socket.id+"] added to room [" + roomId + "]")

		socket.on('disconnect', () => {
			socket.to(roomId).emit("user-disconnected", { username, userId })
			console.log("User [" + username + ":"+socket.id+"] disconnected")
		})
		
		db.doc("collabs/" + collabId).get().then(snap => { 
			const collab = snap.data()
			console.log(collabId)
			socket.emit("load-document", { content: collab.content, published: collab.published })
		})

		// add them to the room
		socket.join(roomId)

		// broadcast to the whole room that this user joined
		socket.to(roomId).emit("user-joined", socket.id, { userId, username })
	})

	// start listening for user data sent by that user to a new user
	socket.on('user-joined ack', (socketid, data) => { 
		socket.to(socketid).emit("join-room ack", data)
	})

	socket.on("send-changes", (delta, { roomId }) => {
      	socket.to(roomId).emit("receive-changes", delta)
    })

	socket.on("send_message", (data) => {
    	socket.to(data.roomId).emit("receive_message", data);
  	});
}
