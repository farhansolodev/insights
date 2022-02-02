// const { _joinSocketRoom, _broadCastChangesToRoom, _handleSocketDisconnect } = require("./controllers/virtualSpaceControllers")
const { db } = require("./firebase")
// const { getDoc, doc, collection } = require("firebase/firestore")

const activeRooms = {}

module.exports = (socket) => {
	console.log("Socket connected: " + socket.id)

	// socket.on('get-document', () => { 
			
	// })

	// start listening for new users requesting to join the room
	socket.on("join-room", async (data) => {
		console.log("User [" + data.username + ":"+socket.id+"] added to room [" + data.roomId + "]")

		socket.on('disconnect', () => {
			socket.to(data.roomId).emit("user-disconnected", data)
			console.log("User [" + data.username + ":"+socket.id+"] disconnected")
			// activeRooms[data.roomId].online--
			// if (activeRooms[data.roomId].online === 0) {
			// 	console.log("Room [" + data.roomId + "] is empty, deleting it...")
			// 	// activeRooms[data.roomId].stopSaving()
			// 	delete activeRooms[data.roomId]
			// }
		})
		
		// if (!activeRooms[data.roomId]) {
		db.doc("virtual-spaces/" + data.roomId).get().then(async (snap) => { 
			const collabId = snap.data().collabId
			const collab = (await db.doc("collabs/" + collabId).get()).data()
			// const stopSaving = startSavingDocumentRegularly(data.roomId)
			// activeRooms[data.roomId] = { online: 1, content: collab.content }
			// console.log("just spun up a room: " ,activeRooms[data.roomId])
			socket.emit("load-document", collab.content)
		})
		// } else {
		// 	activeRooms[data.roomId].online++
		// 	console.log("already running room: ", activeRooms[data.roomId])
		// 	socket.emit("load-document", activeRooms[data.roomId].content)
		// }

		// add them to the room
		socket.join(data.roomId)

		// broadcast to the whole room that this user joined
		socket.to(data.roomId).emit("user-joined", socket.id, data)
	})

	// start listening for user data sent by that user to a new user
	socket.on('user-joined ack', (socketid, data) => { 
		socket.to(socketid).emit("join-room ack", data)
	})

	socket.on("send-changes", (delta, { roomId }) => {
		// console.log(delta)
		// activeRooms[roomId] && activeRooms[roomId].push(delta)
      	socket.to(roomId).emit("receive-changes", delta)
    })
}

// function startSavingDocumentRegularly(roomId) {
// 	const stop = setInterval(() => {
// 		if(!activeRooms[roomId]) return
// 		console.log("saving document: ", roomId)
// 		// db.doc("virtual-spaces/" + roomId).set({ content: activeRooms[roomId].content })
// 	}, 3000)
// 	return stop
// }
