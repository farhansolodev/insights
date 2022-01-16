// const VirtualSpace = require("./models/VirtualSpace")
const { db } = require("./app")

/**
 *
 * @param {{
 *      USER_ID: string,
 *      COLLAB_ID: string
 * }} options parameters sent by client when requesting Collab data
 */
const getDocumentHandler = (options) => {
	const COLLAB_ID = options.COLLAB_ID
	console.log("USER [" + options.USER_ID + "] requesting COLLAB [" + COLLAB_ID + "]")

    const collab = new Collab({
        id: COLLAB_ID,
    })

	socket.emit("load-document", document.data)
	// socket.on("send-changes", (delta) => {
	//     console.log(delta)
	//     socket.broadcast.to(documentId).emit("receive-changes", delta)
	// })
	// socket.on("save-document", async (data) => {
	//     // await Document.findByIdAndUpdate(documentId, { data })
	//     updateDocument(documentId, data)
	// })
}

/**
 *
 * @param {{
 *      USER_ID: string,
 *      ROOM_NAME: string
 * }} options parameters sent by client when user wants to create a room
 */
const createRoomHandler = async (socket, options) => {
	console.log("USER [" + options.USER_ID + "] is trying to create a Virtual Space")

	// const room = new VirtualSpace({
	// 	name: options.ROOM_NAME,
	// 	owners: [options.USER_ID],
	// })
    const ROOM_docRef = await db.collection("virtual-spaces").add({
        name: options.ROOM_NAME,
        owners: [options.USER_ID],
    })
    
    const ROOM_ID = ROOM_docRef.id

	console.log("Virtual Space [" + ROOM_NAME + "] created")

	socket.join(ROOM_ID) && console.log("USER [" + options.USER_ID + "] has joined Virtual Space [" + room.name + "]")
}

/**
 * @param {*} socket
 * @param {{
 *      USER_ID: string,
 *      ROOM_ID: string
 * }} options parameters sent by client when user wants to join a room
 */
const joinRoomHandler = (socket, options) => {
	const ROOM_ID = options.ROOM_ID
	console.log("USER [" + options.USER_ID + "] is trying to join Virtual Space [" + ROOM_ID + "]")

	const room = new VirtualSpace({
		id: ROOM_ID,
	})

	room.getSerialized().then((data) => {
		socket.emit("load-room", data) && console.log("Data from Virtual Space [" + room.name + "] sent to USER [" + options.USER_ID + "]")
	})

	socket.join(ROOM_ID) && console.log("USER [" + options.USER_ID + "] has joined Virtual Space [" + room.name + "]")
}

module.exports = {
	connectionHandler: (socket) => {
		console.log("-> USER [" + socket.id + "] connected")
		socket.on("create-room", (options) => createRoomHandler(socket, options))
		socket.on("join-room", (options) => joinRoomHandler(socket, options))
		socket.on("get-document", getDocumentHandler)
	},
}
