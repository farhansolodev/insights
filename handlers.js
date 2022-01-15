const { db } = require("./app")

const getDocumentHandler = (options) => {
    console.log("USER [" + options.USER_ID + "] is trying to view COLLAB [" + options.COLLAB_ID + "]")
    socket.join(documentId)
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
 * }} options parameters sent by client when user wants to create a room
 */
const createRoomHandler = (socket, options) => {
    db.collection("virtual-spaces").add()
}

/**
 * @param {*} socket
 * @param {{
 *      USER_ID: string,
 *      ROOM_ID: string
 * }} options parameters sent by client when user wants to join a room
 */
const joinRoomHandler = (socket, options) => {}

module.exports = {
	connectionHandler: (socket) => {
        console.log("-> USER [" + socket.id + "] connected")
        socket.on("create-room", (options) => createRoomHandler(socket, options))
        socket.on("join-room", (options) => joinRoomHandler(socket, options))
		socket.on("get-document", getDocumentHandler)
	},
}