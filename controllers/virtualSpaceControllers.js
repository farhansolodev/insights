const VS = require("../models/VirtualSpace")
const Collab = require("../models/Collab")
const User = require("../models/User")
const { io } = require("../app")
const registerSocketHandlers = require("../socketHandlers")

module.exports = {
	/**
	 * - user sends room name to create a virtual space
	 * - the following actions are taken with firestore:
	 *    - a new virtual space document is created, with firestore generating an id and the client providing:
	 *       - the name of the room
	 *       - the user's id as the room's only owner and member
	 * - the user is connected to a socket.io room by the id of the virtual space document
	 * - a collab document with no content is created, with firestore generating:
	 *    - a collab id
	 *    - a read id and write id (PART 3)
	 * - and the client providing:
	 *    - the user's id as the collab's only owner
	 * - the collab id is set as the virtual space's collab id
	 * - information regarding the collab and virtual-space is sent to the user
	 * - websocket handlers are registered
	 * - the id of the document is added to the user's list of previously joined virtual spaces
	 * @param {{
	 *    USER_ID: string,
	 *    ROOM_NAME: string
	 * }} req
	 * @param {*} res
	 */
	createVirtualSpace: async (req, res) => {
		try {
			console.log("1) User [" + req.body.USER_ID + "] requested to create a Virtual Space and join it")

			let roomRef = await VS.create({
				name: req.body.ROOM_NAME,
				owners: [req.body.USER_ID],
			})

			console.log("2) Virtual Space document [" + roomRef.id + "] created")

			let collabRef = await Collab.create({
				owners: [req.body.USER_ID],
			})
			console.log("3) Collab document [" + collabRef.id + "] created with no content")

			VS.setCollabId(roomRef.id, collabRef.id)
			roomRef = VS.getRoomById(roomRef.id)
			console.log("4) Collab Id [" + collabRef.id + "] set as Virtual Space [" + roomRef.id + "]'s CollabId")

			const [room, collab] = await Promise.all([roomRef.get(), collabRef.get()])

			res.status(201).send({
				message: "Virtual Space created with blank collab",
				data: {
					room: room["_fieldsProto"],
					collab: collab["_fieldsProto"],
				},
			})
			console.log("5) Sent Virtual Space and Collab data to user")

			// By the time the HTTP response has reached the client, the websocket connection handler has definitely been registered
			// So the handler is always ready before the user tries to connect through websocket
			io.on("connection", (socket) => {
				socket.join(room.id)
				console.log("6) User [" + req.body.USER_ID + "] has joined Virtual Space [" + room.id + ": " + room.get("name") + "]")
				registerSocketHandlers(socket, room.id)
			})
			console.log("7) All Websocket event handlers registered")

			User.addRoom(req.body.USER_ID, room.id)
			console.log("8) Updated User [" + req.body.USER_ID + "]'s list of previously joined Virtual Spaces")
		} catch (error) {
			res.status(500).send("Error creating Virtual Space: " + error)
			throw error
		}
	},

	/**
	 * - user sends room id to join a virtual space
	 * - room id is used to add user to a room
	 * - websocket handlers are registered
	 * - the following actions are taken with firestore:
	 *   - the room id is used to find the virtual space document
	 *   - the vs document is updated to add the user's id to the list of owners x
	 *   - the vs data is sent to the user
	 *   - the collabId from the vs document is used to send the collab document to the user
	 *   - the collabId from the vs document is used to add the user's id to the list of owners of the collab
	 *   - the user document's list of previously joined virtual spaces is updated to include the room id
	 * @param {{
	 *    USER_ID: string,
	 *    ROOM_ID: string
	 * }} req
	 * @param {*} res
	 */
	joinVirtualSpace: async (req, res) => {
		try {
			console.log("1) User [" + req.body.USER_ID + "] requested to join Virtual Space [" + req.body.ROOM_ID + "]")

			let roomRef = VS.getRoomById(req.body.ROOM_ID)
			console.log("2) Virtual Space document [" + roomRef.id + "] found")

			VS.addOwners(roomRef.id, [req.body.USER_ID])
			console.log("5) User [" + req.body.USER_ID + "] added as an Owner of the Virtual Space [" + roomRef.id + "]")

			const collabId = (await roomRef.get()).get("collabId")
			let collabRef = Collab.getCollabById(collabId)
			console.log("6) Collab document [" + collabRef.id + "] found")

			const [room, collab] = await Promise.all([roomRef.get(), collabRef.get()])

			res.status(200).send({
				message: "Virtual Space succesfully joined",
				data: {
					room: room["_fieldsProto"],
					collab: collab["_fieldsProto"],
				},
			})
			console.log("7) Sent Virtual Space and Collab data to user")

			io.on("connection", (socket) => {
				socket.join(roomRef.id)
				console.log("3) User [" + req.body.USER_ID + "] has joined Virtual Space [" + roomRef.id + "]")
				registerSocketHandlers(socket, roomRef.id)
			})
			console.log("4) All Websocket event handlers registered")

			Collab.addOwners(collab.id, [req.body.USER_ID])
			console.log("8) User [" + req.body.USER_ID + "] added as an Owner of the Collab document [" + collab.id + "]")

			User.addRoom(req.body.USER_ID, room.id)
			console.log("9) Updated User [" + req.body.USER_ID + "]'s list of previously joined Virtual Spaces")
		} catch (error) {
			res.status(500).end()
			throw error
		}
	},
}
