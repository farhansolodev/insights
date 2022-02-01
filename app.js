const registerSocketHandlers = require("./socketHandlers")
const PORT = process.env.PORT || 3000

// Initialize Firebase
require("./firebase")

// Initialize Express
const express = require("express")
const app = express()
const http = require("http").createServer(app)
var cors = require("cors")
app.use(cors())
app.use(express.json())

// Initialize Socket.io
require("socket.io")(http, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	},
}).on("connection", registerSocketHandlers)

// Set up http routes
// try {
// 	const virtualSpaceRoutes = require("./routes/virtualSpaceRoutes")
// 	const payload = {
// 		room: {
// 			id: "some id",
// 			name: "some name",
// 		},
// 		collab: {
// 			id: "some id",
// 			name: "some name",
// 			content: {
// 				arrayValue: {
// 					values: {},
// 				},
// 			},
// 		},
// 	}
// 	let i = 0,
// 		j = 0
// 	app.get("/vs", (req, res) => {
// 		// registerSocketHandlers(io, req.query["USER_ID"], req.query["ROOM_ID"])
// 		res.header("Access-Control-Allow-Origin", "*")
// 		console.log(
// 			`\n${++i}) User ${JSON.stringify(req.query["USER_ID"])} is trying to join ROOM [id: ${req.query["ROOM_ID"]}]` + ` Method: ${req.method}`
// 		)
// 		res.status(200).send(payload)
// 	})
// 	app.post("/vs", (req, res) => {
// 		// registerSocketHandlers(io, req.body.USER_ID, req.body.ROOM_NAME)
// 		res.header("Access-Control-Allow-Origin", "*")
// 		console.log(
// 			`\n${++j}) User ${JSON.stringify(req.body.USER_ID)} is trying to create ROOM [name:${req.body.ROOM_NAME}]` + ` Method: ${req.method}`
// 		)
// 		res.status(200).send(payload)
// 	})
// 	// app.use("/vs", virtualSpaceRoutes)
// } catch (error) {
// 	throw error
// }

http.listen(PORT, () => console.log(`Listening for HTTP requests on port ${PORT}... `))
