const VS = require("../models/VirtualSpace")
const Collab = require("../models/Collab")
const User = require("../models/User")
const { io } = require("../app")

module.exports = {
	/**
	 * - user sends room name to create a virtual space
	 * - the following actions are taken with firestore:
	 *    - a new virtual space document is created, with firestore generating an id and the client providing:
	 *       - the name of the room x
	 *       - the user's id as the room's only owner and member x
	 * - the user is connected to a socket.io room by the id of the virtual space document x
	 * - a collab document with no content is created, with firestore generating:
	 *    - a collab id x
	 *    - a read id and write id (PART 3)
	 * - and the client providing:
	 *    - the user's id as the collab's only owner x
	 * - the collab id is set as the virtual space's collab id
	 * - information regarding the collab and virtual-space is sent to the user x
	 * - the id of the document is added to the user's list of previously joined virtual spaces x
	 * @param {{
	 *    USER_ID: string,
	 *    ROOM_NAME: string
	 * }} req
	 * @param {*} res
	 */
	createVirtualSpace: async (req, res) => {
		try {
			console.log("1) User [" + req.body.USER_ID + "] requested to create a Virtual Space and join it")

			let room = await VS.create({
				name: req.body.ROOM_NAME,
				owners: [req.body.USER_ID],
			})
			console.log("2) Virtual Space document [" + room.id + "] created")

			let collab = await Collab.create({
			    owners: [req.body.USER_ID],
			})
			console.log("3) Collab document [" + collab.id + "] created with no content")

			// room = await VS.setCollabId(room.id, collab.id)
			// room.set("collabId", collab.id)
			// console.log("4) Collab Id ["+ collab.id +"] set as Virtual Space ["+ room.id +"]'s CollabId")

			res.status(201).send({
				message: "Virtual Space created with blank collab",
				data: {
					room: room,
					collab: collab,
				},
			})
			console.log("5) Sent Virtual Space and Collab data to user")

			// By the time the HTTP response has reached the client, the websocket connection handler has definitely been registered
			// So the handler is always ready before the user tries to connect through websocket
			io.on("connection", (socket) => {
				socket.join(room.id)
				console.log("7) User [" + req.body.USER_ID + "] has joined Virtual Space [" + room.id + ": " + room.get("name") + "]")
			})
            console.log("6) Websocket connection handler registered")
            
            let user = await User.addRoom(req.body.USER_ID, room.id)
            console.log(user)
            console.log("8) Updated User [" + req.body.USER_ID + "]'s list of previously joined Virtual Spaces")

		} catch (error) {
			res.status(500).end()
			throw error
		}

	},
}
