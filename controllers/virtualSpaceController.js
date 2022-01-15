const { server } = require("../app")
const io = require("socket.io")(server)
const VirtualSpace = require("../models/VirtualSpace")

io.on("connection", (socket) => console.log("User connected: " + socket.id))

module.exports = {
    createVirtualSpace: async (req, res) => {
        console.log(' Creating virtual space...')
		// const virtualSpace = new VirtualSpace({
		// 	name: req.body.name, // string
		// 	displayPic: req.body.displayPic, // base64
		// 	owners: req.body.owners, // array of objects
		// })

		// try {
		// 	const data = await virtualSpace.save()
		// 	const statusCode = 201
		// 	res.status(statusCode).send({
		// 		status: statusCode,
		// 		message: "Virtual space created successfully",
		// 		data: data,
		// 	})
		// } catch (err) {
		// 	const statusCode = 503
		// 	res.status(statusCode).send({
		// 		status: statusCode,
		// 		...err,
		// 	})
		// }

		res.end()
	},
}
