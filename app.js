const registerSocketHandlers = require("./socketHandlers")
const PORT = process.env.PORT || 3000

// // Initialize Firebase
// require("./firebase")

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

http.listen(PORT, () => console.log(`Listening for HTTP requests on port ${PORT}... `))
